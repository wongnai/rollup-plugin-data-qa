import { IS_E2E_ENABLED } from 'pluginConstants'

import { ChainFunctionWithPropsParams } from './types'

export default function chainFunctionWithProps({
	code,
	attrs,
	functionName,
	startPosition,
	childOverrideParent = false,
}: ChainFunctionWithPropsParams) {
	const spread = `...(${IS_E2E_ENABLED} && ${JSON.stringify(attrs)})`
	const attrsBody = childOverrideParent
		? `props => ({...props, ${spread}})`
		: `props => ({${spread}, ...props})`

	code.appendRight(startPosition, `.${functionName}(${attrsBody})`)
}
