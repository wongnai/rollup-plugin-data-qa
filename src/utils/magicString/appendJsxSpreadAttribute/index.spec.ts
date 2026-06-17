import MagicString from 'magic-string'

import { IS_E2E_ENABLED } from 'pluginConstants'

import appendJsxSpreadAttribute from '.'

describe('appendJsxSpreadAttribute()', () => {
	it('should insert a conditional data-qa spread before existing jsx attributes', () => {
		const code = new MagicString('<div className="a" />')

		appendJsxSpreadAttribute({
			code,
			startPosition: 5,
			attrs: {
				'data-qa': 'component-name',
			},
		})

		expect(code.toString()).toBe(
			`<div {...(${IS_E2E_ENABLED} && {"data-qa":"component-name"})} className="a" />`,
		)
	})

	it('should insert a conditional data-qa spread after existing jsx attributes when childOverrideParent is true', () => {
		const code = new MagicString('<div className="a" />')

		appendJsxSpreadAttribute({
			code,
			startPosition: 18,
			attrs: {
				'data-qa': 'component-name',
			},
			childOverrideParent: true,
		})

		expect(code.toString()).toBe(
			`<div className="a" {...(${IS_E2E_ENABLED} && {"data-qa":"component-name"})} />`,
		)
	})
})
