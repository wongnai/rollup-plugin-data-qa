import { createFilter } from '@rollup/pluginutils'
import { BaseNode, walk } from 'estree-walker'
import MagicString from 'magic-string'
import { PluginImpl } from 'rollup'

import { DEFAULT_STYLED_COMPONENT_NAMES, UNCHANGED } from 'pluginConstants'
import { InjectDataQaParams } from 'types'
import ensureArray from 'utils/ensureArray'
import formatName from 'utils/formatName'
import getParseOptions from 'utils/getParseOptions'
import shouldProcessModule from 'utils/shouldProcessModule'
import isJsxElement from 'utils/react/isJsxElement'
import isReactNode from 'utils/react/isReactNode'
import isReactFragment from 'utils/react/isReactFragment'
import getStyledComponentName from 'utils/react/findStyledComponentName'

import injectJsxElement from 'core/injectJsxElement'
import injectReactFunctionComponent from 'core/injectReactFunctionComponent'
import injectStyledComponent from 'core/injectStyledComponent'

let input: string[] = []

export const injectDataQa: PluginImpl<InjectDataQaParams> = ({
	format = 'paramCase',
	include = [],
	exclude = [],
	options: {
		disabledReactFunctionComponent,
		disabledStyledComponent,
		styledComponentNames = DEFAULT_STYLED_COMPONENT_NAMES,
	} = {},
}: InjectDataQaParams = {}) => ({
	name: 'rollup-plugin-data-qa',
	options: options => {
		input = options.input ? Object.values(options.input) : []

		return options
	},
	transform(code, id) {
		if (!input) {
			this.error('not found input')
		}

		const filter = createFilter([...input, ...ensureArray(include)], exclude)

		if (!filter(id)) {
			return UNCHANGED
		}

		if (!shouldProcessModule(id)) {
			return UNCHANGED
		}

		try {
			const parse = this.parse.bind(this)

			const ast: BaseNode = parse(code, getParseOptions(id))

			const magicString = new MagicString(code)

			if (!disabledReactFunctionComponent) {
				const processReactFunctionComponent = (
					inputNode: BaseNode,
					inputNodeName?: string,
					startPosition?: number,
				) => {
					walk(inputNode, {
						enter(node: any) {
							// skip the same node that we are processing, to prevent infinite loop
							if (startPosition === node.start) return

							// skip react fragment ex: `<></>`
							// skip object expression ex: `{}`
							if (isReactFragment(node) || node.type === 'ObjectExpression') {
								return this.skip()
							}

							if ((isReactNode(node) || isJsxElement(node)) && inputNodeName) {
								const formattedName = formatName(inputNodeName, format)

								const injectElement = isJsxElement(node)
									? injectJsxElement
									: injectReactFunctionComponent

								const isInjected = injectElement({
									code: magicString,
									componentName: formattedName,
									node,
								})

								if (!isInjected) {
									return
								}

								// skip processing the children of react node
								return this.skip()
							}

							const nodeName = node.id?.name

							if (nodeName) {
								processReactFunctionComponent(node, nodeName, node.start)
							}
						},
					})
				}

				processReactFunctionComponent(ast)
			}

			if (!disabledStyledComponent) {
				let styledComponentName = ''

				walk(ast, {
					enter(node, parent) {
						// skip react node and all its children for better performance
						if (isReactNode(node) || isJsxElement(node)) return this.skip()

						styledComponentName = getStyledComponentName(node) || styledComponentName

						if (styledComponentName) {
							const formattedStyledComponentName = formatName(styledComponentName, format)

							const isInjected = injectStyledComponent({
								code: magicString,
								styledComponentName: formattedStyledComponentName,
								styledComponentNames,
								node,
								parent,
							})

							if (isInjected) {
								styledComponentName = ''

								// skip processing the children of styled component
								return this.skip()
							}
						}
					},
				})
			}

			if (!magicString.hasChanged()) {
				return UNCHANGED
			}

			return {
				code: magicString.toString(),
				map: magicString.generateMap({
					file: id,
					includeContent: true,
					hires: true,
				}),
			}
		} catch (error) {
			this.warn(`${id} - ${error}`)
		}
	},
})
