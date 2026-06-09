import { FRAGMENT_NAMES } from 'pluginConstants'

export default function isReactFragment(node: Record<string, any>) {
	if (node?.type === 'JSXFragment') {
		return true
	}

	if (node?.type === 'JSXElement') {
		return FRAGMENT_NAMES.includes(node.openingElement?.name?.name)
	}

	return FRAGMENT_NAMES.includes(node?.arguments?.[0]?.name)
}
