import shouldProcessModule from '.'

describe('shouldProcessModule()', () => {
	it.each([
		['src/Component.tsx', true],
		['src/Component.jsx', true],
		['src/Component/styled.ts', true],
		['src/tracking/components/EndOfOrderStatus/styled.ts', true],
		['src/Component/types.ts', false],
		['src/auth/keys.ts', false],
		['src/Component.d.ts', false],
		['src/Component.js', true],
	])('should return %s -> %s', (id, expected) => {
		expect(shouldProcessModule(id)).toBe(expected)
	})
})
