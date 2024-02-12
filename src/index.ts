import { createFilter } from '@rollup/pluginutils'
import { BaseNode, walk } from 'estree-walker'
import { isEmpty, last } from 'lodash'
import MagicString from 'magic-string'
import { PluginImpl } from 'rollup'

import { UNCHANGED } from 'pluginConstants'
import { InjectDataQaParams } from 'types'
import ensureArray from 'utils/ensureArray'
import formatName from 'utils/formatName'
import findFunctionComponentName from 'utils/magicString/react/findFunctionComponentName'
import getStyledComponentName from 'utils/magicString/react/findStyledComponentName'

import injectReactFunctionComponent from 'core/injectReactFunctionComponent'
import injectStyledComponent from 'core/injectStyledComponent'

let input: string[] = []

export const injectDataQa: PluginImpl<InjectDataQaParams> = ({
	format = 'paramCase',
	include = [],
	exclude = [],
	options: { disabledReactFunctionComponent, disabledStyledComponent } = {},
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

		const parse = this.parse.bind(this)
		let ast: BaseNode | undefined
		let magicString: MagicString | undefined

		try {
			ast = parse(code)
		} catch (error) {
			this.warn(`${id} - ${error}`)
		}

		if (!ast) return UNCHANGED

		let styledComponentName = ''
		const functionComponentNames: string[] = []

		walk(ast, {
			enter(node: Record<string, any>, parent: Record<string, any>) {
				magicString = magicString || new MagicString(code)

				if (!disabledReactFunctionComponent) {
					const functionComponentName = findFunctionComponentName({ node, parent })

					if (functionComponentName && !functionComponentNames.includes(functionComponentName)) {
						functionComponentNames.push(functionComponentName)
					}

					if (!isEmpty(functionComponentNames)) {
						const isInjected = injectReactFunctionComponent({
							code: magicString,
							componentName: formatName(last(functionComponentNames)!, format),
							node,
							parent,
						})

						isInjected && functionComponentNames.pop()
					}
				}

				if (!disabledStyledComponent) {
					styledComponentName = getStyledComponentName(node) || styledComponentName

					if (styledComponentName) {
						const isInjected = injectStyledComponent({
							code: magicString,
							styledComponentName: formatName(styledComponentName, format),
							node,
							parent,
						})

						if (isInjected) {
							styledComponentName = ''
						}
					}
				}
			},
		})

		if (!magicString) {
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
	},
})
