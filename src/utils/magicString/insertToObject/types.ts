import MagicString from 'magic-string'

export interface InsertToObjectParams {
	code: MagicString
	node: Record<string, any>
	attrs: Record<string, any>
}
