import { IS_E2E_ENABLED } from 'pluginConstants'

import { InsertToObjectParams } from './types'

export default function insertToObject({ code, node, attrs }: InsertToObjectParams) {
	if (node?.type === 'ObjectExpression') {
		// NOTE: start position is `{` so we will increase 1 for insert behind it.
		code.appendLeft(node.start + 1, `...(${IS_E2E_ENABLED} && ${JSON.stringify(attrs)}),`)
	}
}
