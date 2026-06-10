import { BaseNode } from 'estree-walker'
import { ParseOptions } from 'utils/getParseOptions/types'

export type FormatType = keyof typeof import('change-case')

export interface InjectDataQaParams {
	include?: string[]
	exclude?: string[]
	format?: FormatType
	options?: InjectDataQaOptions
}

export interface InjectDataQaOptions {
	disabledStyledComponent?: boolean
	disabledReactFunctionComponent?: boolean
	styledComponentNames?: string[]
}

export interface PluginTransformContext {
	parse: (input: string, options?: ParseOptions) => BaseNode
	warn: (message: string) => void
}

export interface InjectDataQaPlugin {
	name: string
	options?: (
		this: PluginTransformContext,
		options: Record<string, any>,
	) => Record<string, any> | void
	transform?: (
		this: PluginTransformContext,
		code: string,
		id: string,
	) => null | { code: string; map?: unknown }
}
