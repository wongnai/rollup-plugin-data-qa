import { IS_E2E_ENABLED } from 'pluginConstants'

import { AppendJsxSpreadAttributeParams } from './types'

export default function appendJsxSpreadAttribute({
	code,
	startPosition,
	attrs,
	childOverrideParent = false,
}: AppendJsxSpreadAttributeParams) {
	const spread = `{...(${IS_E2E_ENABLED} && ${JSON.stringify(attrs)})}`

	if (childOverrideParent) {
		code.appendLeft(startPosition, ` ${spread}`)
		return
	}

	code.appendLeft(startPosition, `${spread} `)
}
