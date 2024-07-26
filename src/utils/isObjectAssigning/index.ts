export default function isObjectAssigning(node: Record<string, any>) {
	return node.callee?.object?.name === 'Object' && node.callee?.property?.name === 'assign'
}
