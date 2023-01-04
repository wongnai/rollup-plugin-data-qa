import MagicString from 'magic-string'

import { IS_E2E_ENABLED } from 'pluginConstants'

describe('chainCodeFunction()', () => {
	const MOCK_CODE = 'styled.a'
	const MOCK_INJECT_POSITION = MOCK_CODE.indexOf('a') + 1
	const MOCK_ATTRS = {
		'data-qa': 'ComponentName',
	}
	const MOCK_FUNCTION_NAME = 'attrs'

	const { default: chainFunctionWithProps } = require('.') as typeof import('.')

	it('should append props to component props with magic string correctly', () => {
		const magicString = new MagicString(MOCK_CODE)

		chainFunctionWithProps({
			code: magicString,
			attrs: MOCK_ATTRS,
			startPosition: MOCK_INJECT_POSITION,
			functionName: MOCK_FUNCTION_NAME,
		})

		expect(magicString.toString()).toBe(
			`styled.a.attrs(props => ({...(${IS_E2E_ENABLED} && {"data-qa":"ComponentName"}),...props}))`,
		)
	})
})
