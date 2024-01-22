export default function isReactNode(node: Record<string, any>) {
	return (
		(node?.callee?.object?.name === 'React' && node?.callee?.property?.name === 'createElement') ||
		(node?.callee?.name === 'jsxDEV' && node.arguments?.[0]?.name !== 'Fragment')
	)
}
