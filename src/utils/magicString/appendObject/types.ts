import MagicString from 'magic-string'

export interface AppendObjectParams {
	code: MagicString
	startPosition: number
	attrs: Record<string, any>
}
