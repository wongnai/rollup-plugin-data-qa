import { DATA_QA } from 'pluginConstants'
import appendJsxSpreadAttribute from 'utils/magicString/appendJsxSpreadAttribute'
import isJsxElement from 'utils/react/isJsxElement'
import { InjectJsxElementParams } from './types'
import { isEmpty, last } from 'lodash-es'

export default function injectJsxElement({
	node,
	code,
	componentName,
	childOverrideParent,
}: InjectJsxElementParams) {
	if (!isJsxElement(node)) {
		return false
	}

	const openingElement = node.openingElement

	if (!openingElement) {
		return false
	}

	const attributes = openingElement.attributes as Array<{ start: number; end: number }>
	const insertPosition =
		childOverrideParent && !isEmpty(attributes)
			? last(attributes)!.end
			: !isEmpty(attributes)
			? attributes[0]!.start
			: openingElement.name.end

	appendJsxSpreadAttribute({
		code,
		startPosition: insertPosition,
		attrs: { [DATA_QA]: componentName },
		childOverrideParent,
	})

	return true
}
