export type ParseLang = 'js' | 'jsx' | 'ts' | 'tsx'

export interface ParseOptions {
	lang?: ParseLang
	jsx?: boolean
}
