import { DATA_QA } from 'pluginConstants'
import appendJsxSpreadAttribute from 'utils/magicString/appendJsxSpreadAttribute'
import isJsxElement from 'utils/react/isJsxElement'
import { InjectJsxElementParams } from './types'

export default function injectJsxElement({ node, code, componentName }: InjectJsxElementParams) {
	if (!isJsxElement(node)) {
		return false
	}

	const openingElement = node.openingElement

	if (!openingElement) {
		return false
	}

	const insertPosition =
		openingElement.attributes.length > 0
			? openingElement.attributes[0].start
			: openingElement.name.end

	appendJsxSpreadAttribute({
		code,
		startPosition: insertPosition,
		attrs: { [DATA_QA]: componentName },
	})

	return true
}
