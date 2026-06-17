import MagicString from 'magic-string'

export type InjectReactFunctionComponentParams = {
	node: Record<string, any>
	code: MagicString
	componentName: string
	childOverrideParent?: boolean
}
