import MagicString from 'magic-string'

import { IS_E2E_ENABLED } from 'pluginConstants'

describe('overwriteCodeWithObject()', () => {
	const MOCK_CODE = '<div {} />'
	const MOCK_START_POSITION = MOCK_CODE.indexOf('{')
	const MOCK_END_POSITION = MOCK_CODE.indexOf('}') + 1
	const MOCK_ATTRS = {
		'data-qa': 'ComponentName',
	}

	const { default: overwriteCodeWithObject } = require('.') as typeof import('.')

	it('should append props to component props with magic string correctly', () => {
		const magicString = new MagicString(MOCK_CODE)

		overwriteCodeWithObject({
			code: magicString,
			attrs: MOCK_ATTRS,
			startPosition: MOCK_START_POSITION,
			endPosition: MOCK_END_POSITION,
		})

		expect(magicString.toString()).toBe(
			`<div {...(${IS_E2E_ENABLED} && {"data-qa":"ComponentName"})} />`,
		)
	})
})
