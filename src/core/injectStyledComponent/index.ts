import { isEmpty, head } from 'lodash'

import { DATA_QA } from 'pluginConstants'
import appendObject from 'utils/magicString/appendObject'
import chainFunctionWithProps from 'utils/magicString/chainFunctionWithProps'
import { InjectStyledComponentParams } from './types'

export default function injectStyledComponent({
	styledComponentName,
	styledComponentNames,
	node,
	parent,
	code,
}: InjectStyledComponentParams) {
	if (
		node?.type === 'MemberExpression' &&
		styledComponentNames.includes(node?.object.name) &&
		parent?.property?.name !== 'attrs'
	) {
		chainFunctionWithProps({
			code,
			startPosition: node.property?.end,
			functionName: 'attrs',
			attrs: { [DATA_QA]: styledComponentName },
		})

		return true
	}

	if (
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
	}

	if (
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
