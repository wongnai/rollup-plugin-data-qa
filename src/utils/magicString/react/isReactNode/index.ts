import { FRAGMENT_NAMES, JSX_CALLEE_NAMES } from 'pluginConstants'

export default function isReactNode(node: Record<string, any>) {
	const isReactCreateElement =
		node?.callee?.object?.name === 'React' && node?.callee?.property?.name === 'createElement'

	const isJsxAndNotFragment =
		JSX_CALLEE_NAMES.includes(node?.callee?.name) &&
		!FRAGMENT_NAMES.includes(node?.arguments?.[0]?.name)

	return isReactCreateElement || isJsxAndNotFragment
}
