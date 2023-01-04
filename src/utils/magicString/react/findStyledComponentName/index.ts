export default function findStyledComponentName(node: Record<string, any>): string {
	if (node.type === 'VariableDeclarator' && node.id) {
		return node.id.name
	}

	return ''
}
