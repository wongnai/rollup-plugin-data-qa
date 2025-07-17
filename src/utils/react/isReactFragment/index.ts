import { FRAGMENT_NAMES } from 'pluginConstants'

export default function isReactFragment(node: Record<string, any>) {
	return FRAGMENT_NAMES.includes(node?.arguments?.[0]?.name)
}
