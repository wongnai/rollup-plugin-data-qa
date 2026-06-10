import mightNeedTransform from '.'

type Options = {
	disabledReactFunctionComponent?: boolean
	disabledStyledComponent?: boolean
}

describe('mightNeedTransform()', () => {
	it.each<[string, boolean, Options?]>([
		['const value = 1', false],
		['const Component = () => <div />', true],
		['const StyledA = styled.div``', true],
		[
			'const value = 1',
			false,
			{ disabledReactFunctionComponent: true, disabledStyledComponent: true },
		],
	])('should return %s -> %s', (code, expected, options = {}) => {
		expect(mightNeedTransform(code, options)).toBe(expected)
	})
})
