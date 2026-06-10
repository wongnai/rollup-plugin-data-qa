import MagicString from 'magic-string'

export type InjectJsxElementParams = {
	node: Record<string, any>
	code: MagicString
	componentName: string
}
