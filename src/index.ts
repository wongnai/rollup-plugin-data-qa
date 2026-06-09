import MagicString from 'magic-string'

import {
	DEFAULT_STYLED_COMPONENT_NAMES,
	TRANSFORM_HOOK_ID_FILTER,
	UNCHANGED,
} from 'pluginConstants'
import { InjectDataQaParams, InjectDataQaPlugin, PluginTransformContext } from 'types'
import createModuleFilter from 'utils/createModuleFilter'
import getParseOptions from 'utils/getParseOptions'
import mightNeedTransform from 'utils/mightNeedTransform'
import shouldProcessModule from 'utils/shouldProcessModule'
import transformAst from 'utils/transformAst'

export type {
	FormatType,
	InjectDataQaOptions,
	InjectDataQaParams,
	InjectDataQaPlugin,
	PluginTransformContext,
} from 'types'

let input: string[] = []
let moduleFilter = createModuleFilter({ input: [], include: [], exclude: [] })

const getModuleId = (id: string) => id.split('?')[0]

const matchesTransformHookId = (id: string) =>
	TRANSFORM_HOOK_ID_FILTER.some(pattern => pattern.test(getModuleId(id)))

export const injectDataQa = ({
	format = 'paramCase',
	include = [],
	exclude = [],
	options: {
		disabledReactFunctionComponent,
		disabledStyledComponent,
		styledComponentNames = DEFAULT_STYLED_COMPONENT_NAMES,
	} = {},
}: InjectDataQaParams = {}): InjectDataQaPlugin => {
	const rebuildModuleFilter = () => {
		moduleFilter = createModuleFilter({
			input,
			include,
			exclude,
		})
	}

	const transformModule = function transformModule(
		this: PluginTransformContext,
		code: string,
		id: string,
	) {
		const moduleId = getModuleId(id)

		if (!shouldProcessModule(moduleId)) {
			return UNCHANGED
		}

		if (!moduleFilter(id)) {
			return UNCHANGED
		}

		if (
			!mightNeedTransform(code, {
				disabledReactFunctionComponent,
				disabledStyledComponent,
			})
		) {
			return UNCHANGED
		}

		try {
			const ast = this.parse(code, getParseOptions(moduleId))
			const magicString = new MagicString(code)

			transformAst({
				ast,
				code: magicString,
				format,
				disabledReactFunctionComponent,
				disabledStyledComponent,
				styledComponentNames,
			})

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
	}

	rebuildModuleFilter()

	return {
		name: 'rollup-plugin-data-qa',
		options: options => {
			input = options.input ? Object.values(options.input) : []
			rebuildModuleFilter()

			return options
		},
		transform(code, id) {
			if (!matchesTransformHookId(id)) {
				return UNCHANGED
			}

			return transformModule.call(this, code, id)
		},
	}
}
