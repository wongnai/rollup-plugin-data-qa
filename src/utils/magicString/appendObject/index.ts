import { IS_E2E_ENABLED } from 'pluginConstants'

import { AppendObjectParams } from './types'

export default function appendObject({ code, startPosition, attrs }: AppendObjectParams) {
	code.appendLeft(startPosition, `...(${IS_E2E_ENABLED} && ${JSON.stringify(attrs)}),`)
}
