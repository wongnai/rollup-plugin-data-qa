export default function isJsxElement(node: Record<string, any>) {
	return node?.type === 'JSXElement'
}
