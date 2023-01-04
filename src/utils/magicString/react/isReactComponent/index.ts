import last from 'lodash/last'

import isReactNode from 'utils/magicString/react/isReactNode'

export default function isReactComponent(node: Record<string, any>): boolean {
	if (isReactNode(node)) {
		return true
	}

	const nodeBody = node.body
	const lastNodeBody = last(nodeBody?.body) as Record<string, any>

	if (lastNodeBody?.type === 'ReturnStatement') {
		return isReactComponent(lastNodeBody.argument)
	}

	if (nodeBody) {
		return isReactComponent(nodeBody)
	}

	return false
}
