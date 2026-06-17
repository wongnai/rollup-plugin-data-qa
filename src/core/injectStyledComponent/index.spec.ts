import MagicString from 'magic-string'

import { DATA_QA, IS_E2E_ENABLED } from 'pluginConstants'

describe('injectStyledComponent()', () => {
	const { default: injectStyledComponent } = require('.') as typeof import('.')

	const defaultParams = {
		code: new MagicString(''),
		styledComponentName: 'styled-button',
		styledComponentNames: new Set(['styled']),
		parent: null,
	}

	it('should return false when node does not match styled component patterns', () => {
		expect(
			injectStyledComponent({
				...defaultParams,
				node: { type: 'Identifier' },
			}),
		).toBe(false)
	})

	it('should chain attrs for styled member expressions', () => {
		const code = 'styled.div'
		const magicString = new MagicString(code)

		const result = injectStyledComponent({
			code: magicString,
			styledComponentName: 'styled-button',
			styledComponentNames: new Set(['styled']),
			node: {
				type: 'MemberExpression',
				object: { name: 'styled' },
				property: { name: 'div', end: code.length },
			},
			parent: { property: { name: 'init' } },
		})

		expect(result).toBe(true)
		expect(magicString.toString()).toBe(
			`styled.div.attrs(props => ({...(${IS_E2E_ENABLED} && {"${DATA_QA}":"styled-button"}), ...props}))`,
		)
	})

	it('should not chain attrs when parent property is attrs', () => {
		expect(
			injectStyledComponent({
				...defaultParams,
				node: {
					type: 'MemberExpression',
					object: { name: 'styled' },
					property: { name: 'div', end: 10 },
				},
				parent: { property: { name: 'attrs' } },
			}),
		).toBe(false)
	})

	it('should append data-qa to attrs arrow function body', () => {
		const code = 'props => ({ color: "red" })'
		const magicString = new MagicString(code)
		const colorStart = code.indexOf('color')

		const result = injectStyledComponent({
			code: magicString,
			styledComponentName: 'styled-button',
			styledComponentNames: new Set(['styled']),
			node: {
				type: 'ArrowFunctionExpression',
				body: {
					properties: [{ start: colorStart }],
				},
			},
			parent: {
				callee: {
					property: { name: 'attrs' },
				},
			},
		})

		expect(result).toBe(true)
		expect(magicString.toString()).toBe(
			`props => ({ ${`...(${IS_E2E_ENABLED} && {"${DATA_QA}":"styled-button"}),`}color: "red" })`,
		)
	})

	it('should append data-qa after attrs arrow function properties when childOverrideParent is true', () => {
		const code = 'props => ({ color: "red" })'
		const magicString = new MagicString(code)
		const colorEnd = code.indexOf('"red"') + '"red"'.length

		const result = injectStyledComponent({
			code: magicString,
			styledComponentName: 'styled-button',
			styledComponentNames: new Set(['styled']),
			childOverrideParent: true,
			node: {
				type: 'ArrowFunctionExpression',
				body: {
					properties: [{ start: code.indexOf('color'), end: colorEnd }],
				},
			},
			parent: {
				callee: {
					property: { name: 'attrs' },
				},
			},
		})

		expect(result).toBe(true)
		expect(magicString.toString()).toBe(
			`props => ({ color: "red", ...(${IS_E2E_ENABLED} && {"${DATA_QA}":"styled-button"}) })`,
		)
	})

	it('should append data-qa to attrs object expression', () => {
		const code = '{ color: "red" }'
		const magicString = new MagicString(code)
		const colorStart = code.indexOf('color')

		const result = injectStyledComponent({
			code: magicString,
			styledComponentName: 'styled-button',
			styledComponentNames: new Set(['styled']),
			node: {
				type: 'ObjectExpression',
				properties: [{ start: colorStart }],
			},
			parent: {
				callee: {
					property: { name: 'attrs' },
				},
			},
		})

		expect(result).toBe(true)
		expect(magicString.toString()).toBe(
			`{ ${`...(${IS_E2E_ENABLED} && {"${DATA_QA}":"styled-button"}),`}color: "red" }`,
		)
	})

	it('should chain attrs with data-qa after props when childOverrideParent is true', () => {
		const code = 'styled.div'
		const magicString = new MagicString(code)

		const result = injectStyledComponent({
			code: magicString,
			styledComponentName: 'styled-button',
			styledComponentNames: new Set(['styled']),
			childOverrideParent: true,
			node: {
				type: 'MemberExpression',
				object: { name: 'styled' },
				property: { name: 'div', end: code.length },
			},
			parent: { property: { name: 'init' } },
		})

		expect(result).toBe(true)
		expect(magicString.toString()).toBe(
			`styled.div.attrs(props => ({...props, ...(${IS_E2E_ENABLED} && {"${DATA_QA}":"styled-button"})}))`,
		)
	})
})
