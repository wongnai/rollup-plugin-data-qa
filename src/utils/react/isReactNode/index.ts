import { JSX_CALLEE_NAMES } from 'pluginConstants'
import isReactFragment from 'utils/react/isReactFragment'

export default function isReactNode(node: Record<string, any>) {
	const isReactCreateElement =
		node?.callee?.object?.name === 'React' && node?.callee?.property?.name === 'createElement'

	const isJsxAndNotFragment =
		JSX_CALLEE_NAMES.includes(node?.callee?.name) && !isReactFragment(node)

	return isReactCreateElement || isJsxAndNotFragment
}
