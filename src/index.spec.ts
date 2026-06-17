import { DATA_QA } from 'pluginConstants'

describe('injectDataQa()', () => {
	const MOCK_MODULE_ID = 'src/components/Button.tsx'
	const MOCK_CODE = 'const Button = () => <div />'

	const createModuleFilterSpy = jest.fn(() => jest.fn(() => true))
	const getParseOptionsSpy = jest.fn(() => ({}))
	const mightNeedTransformSpy = jest.fn(() => true)
	const shouldProcessModuleSpy = jest.fn(() => true)
	const transformAstSpy = jest.fn()

	jest.doMock('utils/createModuleFilter', () => ({
		__esModule: true,
		default: createModuleFilterSpy,
	}))
	jest.doMock('utils/getParseOptions', () => ({
		__esModule: true,
		default: getParseOptionsSpy,
	}))
	jest.doMock('utils/mightNeedTransform', () => ({
		__esModule: true,
		default: mightNeedTransformSpy,
	}))
	jest.doMock('utils/shouldProcessModule', () => ({
		__esModule: true,
		default: shouldProcessModuleSpy,
	}))
	jest.doMock('utils/transformAst', () => ({
		__esModule: true,
		default: transformAstSpy,
	}))

	jest.resetModules()

	const { injectDataQa } = require('.') as typeof import('.')

	const defaultContext = {
		parse: jest.fn(() => ({ type: 'Program', body: [] })),
		warn: jest.fn(),
	}

	afterEach(() => {
		jest.clearAllMocks()
		createModuleFilterSpy.mockReturnValue(jest.fn(() => true))
		mightNeedTransformSpy.mockReturnValue(true)
		shouldProcessModuleSpy.mockReturnValue(true)
	})

	it('should return plugin with name rollup-plugin-data-qa', () => {
		expect(injectDataQa().name).toBe('rollup-plugin-data-qa')
	})

	it('should return null when file id does not match transform hook filter', () => {
		const plugin = injectDataQa()

		expect(plugin.transform!.call(defaultContext, MOCK_CODE, 'styles.css')).toBeNull()
	})

	it('should return null when shouldProcessModule returns false', () => {
		shouldProcessModuleSpy.mockReturnValueOnce(false)

		const plugin = injectDataQa()

		expect(plugin.transform!.call(defaultContext, MOCK_CODE, MOCK_MODULE_ID)).toBeNull()
		expect(shouldProcessModuleSpy).toHaveBeenCalledWith(MOCK_MODULE_ID)
	})

	it('should return null when module filter excludes the file', () => {
		createModuleFilterSpy.mockReturnValueOnce(jest.fn(() => false))

		const plugin = injectDataQa({ exclude: ['**/excluded/**'] })

		expect(plugin.transform!.call(defaultContext, MOCK_CODE, MOCK_MODULE_ID)).toBeNull()
		expect(createModuleFilterSpy).toHaveBeenCalledWith({
			include: [],
			exclude: ['**/excluded/**'],
		})
	})

	it('should return null when mightNeedTransform returns false', () => {
		mightNeedTransformSpy.mockReturnValueOnce(false)

		const plugin = injectDataQa()

		expect(plugin.transform!.call(defaultContext, 'const value = 1', MOCK_MODULE_ID)).toBeNull()
	})

	it('should return null when transformAst does not modify code', () => {
		const plugin = injectDataQa()

		expect(plugin.transform!.call(defaultContext, MOCK_CODE, MOCK_MODULE_ID)).toBeNull()
		expect(transformAstSpy).toHaveBeenCalled()
	})

	it('should return transformed code and source map when transformAst modifies code', () => {
		transformAstSpy.mockImplementationOnce(({ code }) => {
			code.appendLeft(0, `// ${DATA_QA}\n`)
		})

		const plugin = injectDataQa()
		const result = plugin.transform!.call(defaultContext, MOCK_CODE, MOCK_MODULE_ID)

		expect(result?.code).toBe(`// ${DATA_QA}\n${MOCK_CODE}`)
		expect(result?.map).toEqual(
			expect.objectContaining({
				sources: [MOCK_MODULE_ID],
				version: 3,
			}),
		)
	})

	it('should pass childOverrideParent to transformAst', () => {
		const plugin = injectDataQa({ childOverrideParent: true })

		plugin.transform!.call(defaultContext, MOCK_CODE, MOCK_MODULE_ID)

		expect(transformAstSpy).toHaveBeenCalledWith(
			expect.objectContaining({
				childOverrideParent: true,
			}),
		)
	})

	it('should pass format and styled component options to transformAst', () => {
		const plugin = injectDataQa({
			format: 'camelCase',
			options: {
				disabledReactFunctionComponent: true,
				disabledStyledComponent: false,
				styledComponentNames: ['styled', 'css'],
			},
		})

		plugin.transform!.call(defaultContext, MOCK_CODE, MOCK_MODULE_ID)

		expect(transformAstSpy).toHaveBeenCalledWith(
			expect.objectContaining({
				format: 'camelCase',
				disabledReactFunctionComponent: true,
				disabledStyledComponent: false,
				styledComponentNames: ['styled', 'css'],
			}),
		)
	})

	it('should strip query string from module id before processing', () => {
		const plugin = injectDataQa()

		plugin.transform!.call(defaultContext, MOCK_CODE, `${MOCK_MODULE_ID}?import`)

		expect(shouldProcessModuleSpy).toHaveBeenCalledWith(MOCK_MODULE_ID)
		expect(getParseOptionsSpy).toHaveBeenCalledWith(MOCK_MODULE_ID)
	})

	it('should warn and return null when parsing fails', () => {
		const warn = jest.fn()
		const parse = jest.fn(() => {
			throw new Error('parse failed')
		})

		const plugin = injectDataQa()

		expect(plugin.transform!.call({ parse, warn }, MOCK_CODE, MOCK_MODULE_ID)).toBeNull()
		expect(warn).toHaveBeenCalledWith(`${MOCK_MODULE_ID} - Error: parse failed`)
	})
})
