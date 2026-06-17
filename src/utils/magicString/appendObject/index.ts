import { IS_E2E_ENABLED } from 'pluginConstants'

import { AppendObjectParams } from './types'

export default function appendObject({
	code,
	startPosition,
	attrs,
	childOverrideParent = false,
}: AppendObjectParams) {
	const spread = `...(${IS_E2E_ENABLED} && ${JSON.stringify(attrs)})`

	if (childOverrideParent) {
		code.appendLeft(startPosition, `, ${spread}`)
		return
	}

	code.appendLeft(startPosition, `${spread},`)
}
