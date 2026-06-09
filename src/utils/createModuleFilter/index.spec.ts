import createModuleFilter from '.'

describe('createModuleFilter()', () => {
	it.each([
		['src/Component.tsx', true],
		['src/Component.jsx', true],
		['src/Component/styled.ts', true],
		['node_modules/react/index.js', false],
		['src/Component.d.ts', false],
	])('should return %s -> %s', (id, expected) => {
		const filter = createModuleFilter({
			input: [],
			include: [],
			exclude: [],
		})

		expect(filter(id)).toBe(expected)
	})
})
