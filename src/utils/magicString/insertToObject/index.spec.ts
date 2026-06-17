import MagicString from 'magic-string'

import { IS_E2E_ENABLED } from 'pluginConstants'

describe('insertToObject()', () => {
	const MOCK_CODE = '<div {} />'
	const MOCK_INJECT_POSITION = MOCK_CODE.indexOf('{')
	const MOCK_ATTRS = {
		'data-qa': 'ComponentName',
	}

	const { default: insertToObject } = require('.') as typeof import('.')

	it('should insert conditional spread after object expression opening brace', () => {
		const magicString = new MagicString(MOCK_CODE)

		insertToObject({
			code: magicString,
			node: {
				type: 'ObjectExpression',
				start: MOCK_INJECT_POSITION,
			},
			attrs: MOCK_ATTRS,
		})

		expect(magicString.toString()).toBe(
			`<div {${`...(${IS_E2E_ENABLED} && ${JSON.stringify(MOCK_ATTRS)}),`}} />`,
		)
	})

	it('should insert conditional spread before closing brace when childOverrideParent is true', () => {
		const code = '<div {} />'
		const magicString = new MagicString(code)
		const objectStart = code.indexOf('{')

		insertToObject({
			code: magicString,
			node: {
				type: 'ObjectExpression',
				start: objectStart,
				end: objectStart + 2,
			},
			attrs: MOCK_ATTRS,
			childOverrideParent: true,
		})

		expect(magicString.toString()).toBe(
			`<div {, ...(${IS_E2E_ENABLED} && ${JSON.stringify(MOCK_ATTRS)})} />`,
		)
	})

	it('should not modify code when node is not an object expression', () => {
		const magicString = new MagicString(MOCK_CODE)

		insertToObject({
			code: magicString,
			node: { type: 'Identifier' },
			attrs: MOCK_ATTRS,
		})

		expect(magicString.toString()).toBe(MOCK_CODE)
	})
})
