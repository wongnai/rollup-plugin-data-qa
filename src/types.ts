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
	parse: (input: string, options?: Record<string, unknown>) => unknown
	warn: (message: string) => void
}

export interface InjectDataQaPlugin {
	name: string
	options?: (
		this: PluginTransformContext,
		options: Record<string, unknown>,
	) => Record<string, unknown> | void
	transform?: (
		this: PluginTransformContext,
		code: string,
		id: string,
	) => null | { code: string; map?: unknown }
}
