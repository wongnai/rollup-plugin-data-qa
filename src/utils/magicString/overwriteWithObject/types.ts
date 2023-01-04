import MagicString from 'magic-string'

export interface OverwriteWithObjectParams {
	code: MagicString
	attrs: Record<string, any>
	startPosition: number
	endPosition: number
}
