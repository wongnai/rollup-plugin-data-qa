import { BaseNode, walk } from 'estree-walker'
import MagicString from 'magic-string'

import injectJsxElement from 'core/injectJsxElement'
import injectReactFunctionComponent from 'core/injectReactFunctionComponent'
import injectStyledComponent from 'core/injectStyledComponent'
import { FormatType } from 'types'
import formatName from 'utils/formatName'
import getStyledComponentName from 'utils/react/findStyledComponentName'
import isJsxElement from 'utils/react/isJsxElement'
import isReactFragment from 'utils/react/isReactFragment'
import isReactNode from 'utils/react/isReactNode'

type Params = {
	ast: BaseNode
	code: MagicString
	format: FormatType
	disabledReactFunctionComponent?: boolean
	disabledStyledComponent?: boolean
	styledComponentNames: string[]
}

export default function transformAst({
	ast,
	code,
	format,
	disabledReactFunctionComponent,
	disabledStyledComponent,
	styledComponentNames,
}: Params) {
	const formattedNameCache = new Map<string, string>()
	const styledComponentNameSet = new Set(styledComponentNames)
	const componentStack: string[] = []
	let styledComponentName = ''

	const getFormattedName = (name: string) => {
		const cached = formattedNameCache.get(name)

		if (cached) {
			return cached
		}

		const formattedName = formatName(name, format)
		formattedNameCache.set(name, formattedName)

		return formattedName
	}

	walk(ast, {
		enter(node: any, parent) {
			if (isReactFragment(node)) {
				return this.skip()
			}

			const isAttrsObjectExpression =
				!disabledStyledComponent &&
				node.type === 'ObjectExpression' &&
				(parent as Record<string, any> | null)?.callee?.property?.name === 'attrs'

			if (node.type === 'ObjectExpression' && !isAttrsObjectExpression) {
				if (!disabledReactFunctionComponent) {
					return this.skip()
				}

				return
			}

			if (isReactNode(node) || isJsxElement(node)) {
				if (!disabledReactFunctionComponent && componentStack.length > 0) {
					const injectElement = isJsxElement(node) ? injectJsxElement : injectReactFunctionComponent

					const isInjected = injectElement({
						code,
						componentName: getFormattedName(componentStack[componentStack.length - 1]),
						node,
					})

					if (isInjected) {
						return this.skip()
					}
				}

				if (!disabledStyledComponent) {
					return this.skip()
				}

				return
			}

			const nodeName = node.id?.name

			if (nodeName && !disabledReactFunctionComponent) {
				componentStack.push(nodeName)
			}

			if (!disabledStyledComponent) {
				styledComponentName = getStyledComponentName(node) || styledComponentName

				if (styledComponentName) {
					const isInjected = injectStyledComponent({
						code,
						styledComponentName: getFormattedName(styledComponentName),
						styledComponentNames: styledComponentNameSet,
						node,
						parent,
					})

					if (isInjected) {
						styledComponentName = ''
						return this.skip()
					}
				}
			}
		},
		leave(node: any) {
			if (node.id?.name && !disabledReactFunctionComponent) {
				componentStack.pop()
			}
		},
	})
}
