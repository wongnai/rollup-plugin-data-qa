import { IS_E2E_ENABLED } from 'pluginConstants'

import { ChainFunctionWithPropsParams } from './types'

export default function chainFunctionWithProps({
	code,
	attrs,
	functionName,
	startPosition,
}: ChainFunctionWithPropsParams) {
	code.appendRight(
		startPosition,
		`.${functionName}(props => ({...(${IS_E2E_ENABLED} && ${JSON.stringify(attrs)}),...props}))`,
	)
}
