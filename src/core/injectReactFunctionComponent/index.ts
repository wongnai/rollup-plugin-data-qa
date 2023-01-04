import head from 'lodash/head'
import isEmpty from 'lodash/isEmpty'
import MagicString from 'magic-string'

import { DATA_QA } from 'pluginConstants'
import appendObject from 'utils/magicString/appendObject'
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
				const props = head(tagProps.properties! as Record<string, any>[])

				props &&
					appendObject({
						code,
						startPosition: props.start,
						attrs: { [DATA_QA]: componentName },
					})
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
