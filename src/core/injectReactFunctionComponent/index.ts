import { isEmpty, last } from 'lodash-es'

import { DATA_QA } from 'pluginConstants'
import isObjectAssigning from 'utils/isObjectAssigning'
import appendObject from 'utils/magicString/appendObject'
import insertToObject from 'utils/magicString/insertToObject'
import overwriteWithObject from 'utils/magicString/overwriteWithObject'
import isReactNode from 'utils/react/isReactNode'
import { InjectReactFunctionComponentParams } from './types'

export default function injectReactFunctionComponent({
	node,
	code,
	componentName,
	childOverrideParent = false,
}: InjectReactFunctionComponentParams) {
	if (!isReactNode(node)) return false

	const tagProps = node.arguments[1]

	if (!tagProps?.start && isEmpty(tagProps?.properties)) return false

	// NOTE: if a component has props, the value will always be undefined
	const hasProps = tagProps.value !== null

	if (!hasProps) {
		overwriteWithObject({
			code,
			startPosition: tagProps.start,
			endPosition: tagProps.end,
			attrs: { [DATA_QA]: componentName },
		})
		return true
	}

	// e.g `<svg>...</svg>`
	if (isObjectAssigning(tagProps)) {
		const firstArgs = tagProps.arguments?.[0] as Record<string, any> | undefined

		if (!firstArgs) return false

		insertToObject({
			code,
			node: firstArgs,
			attrs: { [DATA_QA]: componentName },
			childOverrideParent,
		})
		return true
	}

	// e.g `<div />`
	if (isEmpty(tagProps.properties)) {
		insertToObject({
			code,
			node: tagProps,
			attrs: { [DATA_QA]: componentName },
			childOverrideParent,
		})
		return true
	}

	const properties = tagProps.properties as Record<string, any>[]
	const insertPosition = childOverrideParent ? last(properties)!.end : properties[0]!.start

	appendObject({
		code,
		startPosition: insertPosition,
		attrs: { [DATA_QA]: componentName },
		childOverrideParent,
	})
	return true
}
