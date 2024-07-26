import { head, isEmpty } from 'lodash'
import MagicString from 'magic-string'

import { DATA_QA } from 'pluginConstants'
import isObjectAssigning from 'utils/isObjectAssigning'
import appendObject from 'utils/magicString/appendObject'
import insertToObject from 'utils/magicString/insertToObject'
import overwriteWithObject from 'utils/magicString/overwriteWithObject'
import isReactNode from 'utils/magicString/react/isReactNode'

type Params = {
	node: Record<string, any>
	parent: Record<string, any>
	code: MagicString
	componentName: string
}

export default function injectReactFunctionComponent({
	node,
	parent,
	code,
	componentName,
}: Params) {
	if (isReactNode(node) && parent.type !== 'CallExpression') {
		const tagProps = node.arguments[1]

		if (tagProps?.start || !isEmpty(tagProps.properties)) {
			const hasProps = tagProps.value !== null // NOTE: if a component has props, the value will always be undefined

			if (hasProps) {
				// e.g `<svg>...</svg>`
				if (isObjectAssigning(tagProps)) {
					const firstArgs = head(tagProps.arguments as Record<string, any>[])

					firstArgs &&
						insertToObject({
							code,
							node: firstArgs,
							attrs: { [DATA_QA]: componentName },
						})
				} else {
					// e.g `<div />`
					if (isEmpty(tagProps.properties)) {
						insertToObject({
							code,
							node: tagProps,
							attrs: { [DATA_QA]: componentName },
						})
					} else {
						const props = head(tagProps.properties as Record<string, any>[])

						props &&
							appendObject({
								code,
								startPosition: props.start,
								attrs: { [DATA_QA]: componentName },
							})
					}
				}
			} else {
				overwriteWithObject({
					code,
					startPosition: tagProps.start,
					endPosition: tagProps.end,
					attrs: { [DATA_QA]: componentName },
				})
			}

			return true
		}
	}

	return false
}
