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
}
