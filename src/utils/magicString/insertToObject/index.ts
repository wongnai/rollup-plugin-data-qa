import { IS_E2E_ENABLED } from 'pluginConstants'

import { InsertToObjectParams } from './types'

export default function insertToObject({
	code,
	node,
	attrs,
	childOverrideParent = false,
}: InsertToObjectParams) {
	if (node?.type !== 'ObjectExpression') {
		return
	}

	const spread = `...(${IS_E2E_ENABLED} && ${JSON.stringify(attrs)})`

	if (childOverrideParent) {
		code.appendLeft(node.end - 1, `, ${spread}`)
		return
	}

	// NOTE: start position is `{` so we will increase 1 for insert behind it.
	code.appendLeft(node.start + 1, `${spread},`)
}
