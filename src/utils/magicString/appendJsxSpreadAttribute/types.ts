import MagicString from 'magic-string'

export interface AppendJsxSpreadAttributeParams {
	code: MagicString
	startPosition: number
	attrs: Record<string, string>
	childOverrideParent?: boolean
}
