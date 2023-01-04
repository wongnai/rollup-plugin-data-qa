import { IS_E2E_ENABLED } from 'pluginConstants'

import { OverwriteWithObjectParams } from './types'

export default function overwriteWithObject({
	code,
	attrs,
	startPosition,
	endPosition,
}: OverwriteWithObjectParams) {
	code.overwrite(startPosition, endPosition, `{...(${IS_E2E_ENABLED} && ${JSON.stringify(attrs)})}`)
}
