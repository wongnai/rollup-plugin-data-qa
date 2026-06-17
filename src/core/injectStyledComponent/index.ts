import { isEmpty, last } from 'lodash-es'

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
	childOverrideParent = false,
}: InjectStyledComponentParams) {
	if (
		node?.type === 'MemberExpression' &&
		styledComponentNames.has(node?.object.name) &&
		parent?.property?.name !== 'attrs'
	) {
		chainFunctionWithProps({
			code,
			startPosition: node.property?.end,
			functionName: 'attrs',
			attrs: { [DATA_QA]: styledComponentName },
			childOverrideParent,
		})

		return true
	}

	if (
		parent?.callee?.property?.name === 'attrs' &&
		node.type === 'ArrowFunctionExpression' &&
		!isEmpty(node.body.properties)
	) {
		const properties = node.body.properties as Record<string, any>[]
		const insertPosition = childOverrideParent ? last(properties)!.end : properties[0]!.start

		appendObject({
			code,
			startPosition: insertPosition,
			attrs: { [DATA_QA]: styledComponentName },
			childOverrideParent,
		})

		return true
	}

	if (
		parent?.callee?.property?.name === 'attrs' &&
		node.type === 'ObjectExpression' &&
		!isEmpty(node.properties)
	) {
		const properties = node.properties as Record<string, any>[]
		const insertPosition = childOverrideParent ? last(properties)!.end : properties[0]!.start

		appendObject({
			code,
			startPosition: insertPosition,
			attrs: { [DATA_QA]: styledComponentName },
			childOverrideParent,
		})

		return true
	}

	return false
}
