export default function isReactNode(node: Record<string, any>) {
	return node.callee?.object?.name === 'React' && node.callee?.property?.name === 'createElement'
}
