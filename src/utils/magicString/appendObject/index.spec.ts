import MagicString from 'magic-string'

import { IS_E2E_ENABLED } from 'pluginConstants'

describe('appendObject()', () => {
	const MOCK_CODE = '<div {} />'
	const MOCK_INJECT_POSITION = MOCK_CODE.indexOf('{') + 1
	const MOCK_ATTRS = {
		'data-qa': 'ComponentName',
	}

	const { default: appendObject } = require('.') as typeof import('.')

	it('should append props to component props with magic string correctly', () => {
		const magicString = new MagicString(MOCK_CODE)

		appendObject({
			code: magicString,
			attrs: MOCK_ATTRS,
			startPosition: MOCK_INJECT_POSITION,
		})

		expect(magicString.toString()).toBe(
			`<div {...(${IS_E2E_ENABLED} && {"data-qa":"ComponentName"}),} />`,
		)
	})
})
