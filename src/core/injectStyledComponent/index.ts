import head from 'lodash/head'
import isEmpty from 'lodash/isEmpty'
import MagicString from 'magic-string'

import { DATA_QA } from 'pluginConstants'
import appendObject from 'utils/magicString/appendObject'
import chainFunctionWithProps from 'utils/magicString/chainFunctionWithProps'

type Params = {
	code: MagicString
	styledComponentName: string
	node: Record<string, any>
	parent: Record<string, any>
}

export default function injectStyledComponent({ styledComponentName, node, parent, code }: Params) {
	if (
		node?.type === 'MemberExpression' &&
		node?.object.name === 'styled' &&
		parent.property?.name !== 'attrs'
	) {
		chainFunctionWithProps({
			code,
			startPosition: node.property?.end,
			functionName: 'attrs',
			attrs: { [DATA_QA]: styledComponentName },
		})

		return true
	} else if (
		parent?.callee?.property?.name === 'attrs' &&
		node.type === 'ArrowFunctionExpression' &&
		!isEmpty(node.body.properties)
	) {
		const properties = node.body.properties as Record<string, any>[]

		appendObject({
			code,
			startPosition: head(properties)!.start,
			attrs: { [DATA_QA]: styledComponentName },
		})

		return true
	} else if (
		parent?.callee?.property?.name === 'attrs' &&
		node.type === 'ObjectExpression' &&
		!isEmpty(node.properties)
	) {
		const properties = node.properties as Record<string, any>[]

		appendObject({
			code,
			startPosition: head(properties)!.start,
			attrs: { [DATA_QA]: styledComponentName },
		})

		return true
	}

	return false
}
