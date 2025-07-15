import { head, isEmpty } from 'lodash'
import MagicString from 'magic-string'

import { DATA_QA } from 'pluginConstants'
import isObjectAssigning from 'utils/isObjectAssigning'
import appendObject from 'utils/magicString/appendObject'
import insertToObject from 'utils/magicString/insertToObject'
import overwriteWithObject from 'utils/magicString/overwriteWithObject'
import isReactNode from 'utils/react/isReactNode'

type Params = {
	node: Record<string, any>
	code: MagicString
	componentName: string
}

export default function injectReactFunctionComponent({ node, code, componentName }: Params) {
	if (!isReactNode(node)) return false

	const tagProps = node.arguments[1]

	if (!tagProps?.start && isEmpty(tagProps.properties)) return false

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
		const firstArgs = head(tagProps.arguments as Record<string, any>[])

		if (!firstArgs) return false

		insertToObject({
			code,
			node: firstArgs,
			attrs: { [DATA_QA]: componentName },
		})
		return true
	}

	// e.g `<div />`
	if (isEmpty(tagProps.properties)) {
		insertToObject({
			code,
			node: tagProps,
			attrs: { [DATA_QA]: componentName },
		})
		return true
	}

	const props = head(tagProps.properties as Record<string, any>[])

	if (!props) return false

	appendObject({
		code,
		startPosition: props.start,
		attrs: { [DATA_QA]: componentName },
	})
	return true
}
