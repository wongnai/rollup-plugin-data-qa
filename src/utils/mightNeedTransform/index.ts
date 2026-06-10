const JSX_PATTERN = /<|jsxDEV|jsx\(|_jsx\(|jsxs\(|_jsxs\(|React\.createElement|createElement\(/
const STYLED_PATTERN = /styled\.|styled\(/

type Params = {
	disabledReactFunctionComponent?: boolean
	disabledStyledComponent?: boolean
}

export default function mightNeedTransform(code: string, params: Params): boolean {
	if (params.disabledReactFunctionComponent && params.disabledStyledComponent) {
		return false
	}

	if (!params.disabledReactFunctionComponent && JSX_PATTERN.test(code)) {
		return true
	}

	if (!params.disabledStyledComponent && STYLED_PATTERN.test(code)) {
		return true
	}

	return false
}
