export default function isReactNode(node: Record<string, any>) {
	const isReactCreateElement =
		node?.callee?.object?.name === 'React' && node?.callee?.property?.name === 'createElement'

	const isJsxAndNotFragment =
		node?.callee?.name?.include?.('jsx') && node?.arguments?.[0]?.name !== 'Fragment'

	return isReactCreateElement || isJsxAndNotFragment
}
