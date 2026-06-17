import MagicString from 'magic-string'

import { DATA_QA, IS_E2E_ENABLED } from 'pluginConstants'

describe('injectReactFunctionComponent()', () => {
	const { default: injectReactFunctionComponent } = require('.') as typeof import('.')

	const defaultParams = {
		code: new MagicString(''),
		componentName: 'button',
	}

	it('should return false when node is not a react node', () => {
		expect(
			injectReactFunctionComponent({
				...defaultParams,
				node: { type: 'Identifier' },
			}),
		).toBe(false)
	})

	it('should return false when props argument has no position and no properties', () => {
		expect(
			injectReactFunctionComponent({
				...defaultParams,
				node: {
					callee: { name: 'jsx' },
					arguments: [
						{ type: 'Literal', value: 'div' },
						{ type: 'ObjectExpression', properties: [] },
					],
				},
			}),
		).toBe(false)
	})

	it('should overwrite undefined props with data-qa object', () => {
		const code = 'jsx("div", undefined)'
		const magicString = new MagicString(code)
		const propsStart = code.indexOf('undefined')
		const propsEnd = propsStart + 'undefined'.length

		const result = injectReactFunctionComponent({
			code: magicString,
			componentName: 'button',
			node: {
				callee: { name: 'jsx' },
				arguments: [
					{ type: 'Literal', value: 'div' },
					{
						type: 'Identifier',
						name: 'undefined',
						start: propsStart,
						end: propsEnd,
						value: null,
					},
				],
			},
		})

		expect(result).toBe(true)
		expect(magicString.toString()).toBe(
			`jsx("div", {...(${IS_E2E_ENABLED} && {"${DATA_QA}":"button"})})`,
		)
	})

	it('should insert data-qa into empty props object', () => {
		const code = 'jsx("div", {})'
		const magicString = new MagicString(code)
		const propsStart = code.indexOf('{')

		const result = injectReactFunctionComponent({
			code: magicString,
			componentName: 'button',
			node: {
				callee: { name: 'jsx' },
				arguments: [
					{ type: 'Literal', value: 'div' },
					{
						type: 'ObjectExpression',
						start: propsStart,
						properties: [],
					},
				],
			},
		})

		expect(result).toBe(true)
		expect(magicString.toString()).toBe(
			`jsx("div", {${`...(${IS_E2E_ENABLED} && {"${DATA_QA}":"button"}),`}})`,
		)
	})

	it('should insert data-qa into Object.assign first argument', () => {
		const code = 'jsx("div", Object.assign({}, props))'
		const magicString = new MagicString(code)
		const objectStart = code.indexOf('{', code.indexOf('Object.assign'))

		const result = injectReactFunctionComponent({
			code: magicString,
			componentName: 'button',
			node: {
				callee: { name: 'jsx' },
				arguments: [
					{ type: 'Literal', value: 'div' },
					{
						type: 'CallExpression',
						start: code.indexOf('Object'),
						callee: {
							object: { name: 'Object' },
							property: { name: 'assign' },
						},
						arguments: [
							{
								type: 'ObjectExpression',
								start: objectStart,
								properties: [],
							},
							{ type: 'Identifier', name: 'props' },
						],
					},
				],
			},
		})

		expect(result).toBe(true)
		expect(magicString.toString()).toContain(`...(${IS_E2E_ENABLED} && {"${DATA_QA}":"button"}),`)
	})

	it('should append data-qa to existing props object', () => {
		const code = 'jsx("div", { className: "a" })'
		const magicString = new MagicString(code)
		const classNameStart = code.indexOf('className')

		const result = injectReactFunctionComponent({
			code: magicString,
			componentName: 'button',
			node: {
				callee: { name: 'jsx' },
				arguments: [
					{ type: 'Literal', value: 'div' },
					{
						type: 'ObjectExpression',
						properties: [{ start: classNameStart }],
					},
				],
			},
		})

		expect(result).toBe(true)
		expect(magicString.toString()).toBe(
			`jsx("div", { ${`...(${IS_E2E_ENABLED} && {"${DATA_QA}":"button"}),`}className: "a" })`,
		)
	})

	it('should append data-qa after existing props when childOverrideParent is true', () => {
		const code = 'jsx("div", { className: "a" })'
		const magicString = new MagicString(code)
		const classNameEnd = code.indexOf('"a"') + '"a"'.length

		const result = injectReactFunctionComponent({
			code: magicString,
			componentName: 'button',
			childOverrideParent: true,
			node: {
				callee: { name: 'jsx' },
				arguments: [
					{ type: 'Literal', value: 'div' },
					{
						type: 'ObjectExpression',
						properties: [{ start: code.indexOf('className'), end: classNameEnd }],
					},
				],
			},
		})

		expect(result).toBe(true)
		expect(magicString.toString()).toBe(
			`jsx("div", { className: "a", ...(${IS_E2E_ENABLED} && {"${DATA_QA}":"button"}) })`,
		)
	})
})
