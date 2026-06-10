import MagicString from 'magic-string'

import { FormatType } from 'types'

type AstNode = Record<string, any>

const asAst = (node: AstNode) => node as Parameters<typeof import('.').default>[0]['ast']

describe('transformAst()', () => {
	const MOCK_JSX_ELEMENT: AstNode = {
		type: 'JSXElement',
		openingElement: {
			type: 'JSXOpeningElement',
			name: { type: 'JSXIdentifier', name: 'div' },
			attributes: [],
		},
	}

	const MOCK_FUNCTION_DECLARATION: AstNode = {
		type: 'FunctionDeclaration',
		id: { type: 'Identifier', name: 'Button' },
		body: {
			type: 'BlockStatement',
			body: [
				{
					type: 'ReturnStatement',
					argument: MOCK_JSX_ELEMENT,
				},
			],
		},
	}

	const MOCK_OBJECT_EXPRESSION: AstNode = {
		type: 'ObjectExpression',
		properties: [],
	}

	const MOCK_REACT_CREATE_ELEMENT: AstNode = {
		type: 'CallExpression',
		callee: {
			type: 'MemberExpression',
			object: { type: 'Identifier', name: 'React' },
			property: { type: 'Identifier', name: 'createElement' },
		},
		arguments: [],
	}

	const injectJsxElementSpy = jest.fn(() => false)
	const injectReactFunctionComponentSpy = jest.fn(() => false)
	const injectStyledComponentSpy = jest.fn(() => false)
	const formatNameSpy = jest.fn((name: string) => `formatted-${name}`)
	const getStyledComponentNameSpy = jest.fn(() => '')
	const isJsxElementSpy = jest.fn((node: Record<string, unknown>) => node.type === 'JSXElement')
	const isReactFragmentSpy = jest.fn(() => false)
	const isReactNodeSpy = jest.fn((node: Record<string, unknown>) => node.type === 'CallExpression')

	jest.doMock('core/injectJsxElement', () => ({
		__esModule: true,
		default: injectJsxElementSpy,
	}))
	jest.doMock('core/injectReactFunctionComponent', () => ({
		__esModule: true,
		default: injectReactFunctionComponentSpy,
	}))
	jest.doMock('core/injectStyledComponent', () => ({
		__esModule: true,
		default: injectStyledComponentSpy,
	}))
	jest.doMock('utils/formatName', () => ({
		__esModule: true,
		default: formatNameSpy,
	}))
	jest.doMock('utils/react/findStyledComponentName', () => ({
		__esModule: true,
		default: getStyledComponentNameSpy,
	}))
	jest.doMock('utils/react/isJsxElement', () => ({
		__esModule: true,
		default: isJsxElementSpy,
	}))
	jest.doMock('utils/react/isReactFragment', () => ({
		__esModule: true,
		default: isReactFragmentSpy,
	}))
	jest.doMock('utils/react/isReactNode', () => ({
		__esModule: true,
		default: isReactNodeSpy,
	}))

	jest.resetModules()

	const { default: transformAst } = require('.') as typeof import('.')

	const defaultParams = {
		ast: asAst({ type: 'Program', body: [] }),
		code: new MagicString(''),
		format: 'paramCase' as FormatType,
		styledComponentNames: ['styled'],
	}

	afterEach(() => {
		jest.clearAllMocks()
		isJsxElementSpy.mockImplementation(
			(node: Record<string, unknown>) => node.type === 'JSXElement',
		)
		isReactFragmentSpy.mockImplementation(() => false)
		isReactNodeSpy.mockImplementation(
			(node: Record<string, unknown>) => node.type === 'CallExpression',
		)
		getStyledComponentNameSpy.mockImplementation(() => '')
	})

	it('should skip react fragment nodes', () => {
		isReactFragmentSpy.mockReturnValueOnce(true)

		transformAst({
			...defaultParams,
			ast: asAst({ type: 'JSXFragment', children: [] }),
		})

		expect(injectJsxElementSpy).not.toHaveBeenCalled()
		expect(injectReactFunctionComponentSpy).not.toHaveBeenCalled()
		expect(injectStyledComponentSpy).not.toHaveBeenCalled()
	})

	it('should skip object expressions when react function component injection is enabled', () => {
		transformAst({
			...defaultParams,
			ast: asAst(MOCK_OBJECT_EXPRESSION),
		})

		expect(getStyledComponentNameSpy).not.toHaveBeenCalled()
		expect(injectStyledComponentSpy).not.toHaveBeenCalled()
	})

	it('should not skip object expressions when react function component injection is disabled', () => {
		transformAst({
			...defaultParams,
			ast: asAst({
				type: 'ObjectExpression',
				properties: [
					{
						type: 'Property',
						value: {
							type: 'VariableDeclarator',
							id: { type: 'Identifier', name: 'StyledBox' },
						},
					},
				],
			}),
			disabledReactFunctionComponent: true,
		})

		expect(getStyledComponentNameSpy).toHaveBeenCalledWith(
			expect.objectContaining({ type: 'VariableDeclarator' }),
		)
	})

	it('should inject jsx element with formatted component name when inside a component', () => {
		transformAst({
			...defaultParams,
			ast: asAst({
				type: 'Program',
				body: [MOCK_FUNCTION_DECLARATION],
			}),
		})

		expect(injectJsxElementSpy).toHaveBeenCalledWith(
			expect.objectContaining({
				componentName: 'formatted-Button',
				node: MOCK_JSX_ELEMENT,
			}),
		)
		expect(formatNameSpy).toHaveBeenCalledWith('Button', 'paramCase')
	})

	it('should inject react function component nodes with formatted component name', () => {
		transformAst({
			...defaultParams,
			ast: asAst({
				type: 'Program',
				body: [
					{
						type: 'FunctionDeclaration',
						id: { type: 'Identifier', name: 'Icon' },
						body: {
							type: 'BlockStatement',
							body: [
								{
									type: 'ReturnStatement',
									argument: MOCK_REACT_CREATE_ELEMENT,
								},
							],
						},
					},
				],
			}),
		})

		expect(injectReactFunctionComponentSpy).toHaveBeenCalledWith(
			expect.objectContaining({
				componentName: 'formatted-Icon',
				node: MOCK_REACT_CREATE_ELEMENT,
			}),
		)
		expect(injectJsxElementSpy).not.toHaveBeenCalled()
	})

	it('should cache formatted component names', () => {
		injectJsxElementSpy.mockReturnValue(true)

		transformAst({
			...defaultParams,
			ast: asAst({
				type: 'Program',
				body: [
					{
						type: 'FunctionDeclaration',
						id: { type: 'Identifier', name: 'Card' },
						body: {
							type: 'BlockStatement',
							body: [
								{
									type: 'ReturnStatement',
									argument: MOCK_JSX_ELEMENT,
								},
								{
									type: 'ReturnStatement',
									argument: MOCK_JSX_ELEMENT,
								},
							],
						},
					},
				],
			}),
		})

		expect(injectJsxElementSpy).toHaveBeenCalledTimes(2)
		expect(formatNameSpy).toHaveBeenCalledTimes(1)
	})

	it('should skip subtree after successful jsx injection', () => {
		injectJsxElementSpy.mockReturnValueOnce(true)

		transformAst({
			...defaultParams,
			ast: asAst({
				type: 'Program',
				body: [MOCK_FUNCTION_DECLARATION],
			}),
		})

		expect(injectJsxElementSpy).toHaveBeenCalledTimes(1)
		expect(injectStyledComponentSpy).not.toHaveBeenCalled()
	})

	it('should skip jsx elements when styled component injection is enabled', () => {
		transformAst({
			...defaultParams,
			ast: asAst({
				type: 'Program',
				body: [MOCK_FUNCTION_DECLARATION],
			}),
		})

		expect(injectJsxElementSpy).toHaveBeenCalled()
		expect(injectStyledComponentSpy).not.toHaveBeenCalled()
	})

	it('should inject styled component with formatted name', () => {
		getStyledComponentNameSpy.mockImplementation((node?: AstNode) => {
			if (node?.type === 'VariableDeclarator') {
				return 'StyledButton'
			}

			return ''
		})
		injectStyledComponentSpy.mockReturnValueOnce(true)

		transformAst({
			...defaultParams,
			ast: asAst({
				type: 'Program',
				body: [
					{
						type: 'VariableDeclarator',
						id: { type: 'Identifier', name: 'StyledButton' },
						init: { type: 'TaggedTemplateExpression' },
					},
				],
			}),
		})

		expect(injectStyledComponentSpy).toHaveBeenCalledWith(
			expect.objectContaining({
				styledComponentName: 'formatted-StyledButton',
				styledComponentNames: expect.any(Set),
			}),
		)
		expect(formatNameSpy).toHaveBeenCalledWith('StyledButton', 'paramCase')
	})

	it('should not inject styled component when styled component injection is disabled', () => {
		getStyledComponentNameSpy.mockReturnValue('StyledButton')

		transformAst({
			...defaultParams,
			ast: asAst({
				type: 'Program',
				body: [
					{
						type: 'VariableDeclarator',
						id: { type: 'Identifier', name: 'StyledButton' },
					},
				],
			}),
			disabledStyledComponent: true,
		})

		expect(getStyledComponentNameSpy).not.toHaveBeenCalled()
		expect(injectStyledComponentSpy).not.toHaveBeenCalled()
	})

	it('should not inject react function components when injection is disabled', () => {
		transformAst({
			...defaultParams,
			ast: asAst({
				type: 'Program',
				body: [MOCK_FUNCTION_DECLARATION],
			}),
			disabledReactFunctionComponent: true,
		})

		expect(injectJsxElementSpy).not.toHaveBeenCalled()
		expect(injectReactFunctionComponentSpy).not.toHaveBeenCalled()
	})

	it('should not skip attrs object expressions as regular object expressions', () => {
		isReactNodeSpy.mockReturnValue(false)
		getStyledComponentNameSpy.mockImplementation((node?: AstNode) =>
			node?.type === 'ObjectExpression' ? 'StyledBox' : '',
		)

		transformAst({
			...defaultParams,
			ast: asAst({
				type: 'CallExpression',
				callee: {
					type: 'MemberExpression',
					property: { type: 'Identifier', name: 'attrs' },
				},
				arguments: [MOCK_OBJECT_EXPRESSION],
			}),
		})

		expect(injectStyledComponentSpy).toHaveBeenCalledWith(
			expect.objectContaining({
				node: MOCK_OBJECT_EXPRESSION,
				styledComponentName: 'formatted-StyledBox',
			}),
		)
	})
})
