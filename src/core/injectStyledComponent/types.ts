import MagicString from 'magic-string'

export type InjectStyledComponentParams = {
	code: MagicString
	styledComponentName: string
	styledComponentNames: string[]
	node: Record<string, any>
	parent: Record<string, any> | null
}
