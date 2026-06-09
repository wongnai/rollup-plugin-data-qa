import { IS_E2E_ENABLED } from 'pluginConstants'

import { AppendJsxSpreadAttributeParams } from './types'

export default function appendJsxSpreadAttribute({
	code,
	startPosition,
	attrs,
}: AppendJsxSpreadAttributeParams) {
	code.appendLeft(startPosition, `{...(${IS_E2E_ENABLED} && ${JSON.stringify(attrs)})} `)
}
