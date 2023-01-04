import MagicString from 'magic-string'

export interface ChainFunctionWithPropsParams {
	code: MagicString
	functionName: string
	attrs: Record<string, any>
	startPosition: number
}
