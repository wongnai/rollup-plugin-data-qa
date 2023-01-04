import isReactComponent from 'utils/magicString/react/isReactComponent'

import { FindFunctionComponentNameParams } from './types'

export default function findFunctionComponentName({
	node,
	parent,
}: FindFunctionComponentNameParams) {
	if (node.type === 'ExportNamedDeclaration' && node.declaration?.id?.name) {
		return node.declaration.id.name
	} else if (parent?.type === 'VariableDeclarator' && parent?.id && isReactComponent(node)) {
		return parent.id.name
	}

	return ''
}
