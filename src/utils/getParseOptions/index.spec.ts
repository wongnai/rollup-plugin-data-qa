import getParseOptions from '.'

describe('getParseOptions()', () => {
	it.each([
		['src/Component.tsx', { lang: 'tsx', jsx: true }],
		['src/Component.jsx', { lang: 'jsx', jsx: true }],
		['src/Component/styled.ts', { lang: 'ts' }],
		['src/Component/types.ts', { lang: 'ts' }],
		['src/Component.d.ts', { lang: 'js' }],
		['src/Component.js', { lang: 'js' }],
	])('should return parse options for %s', (id, expected) => {
		expect(getParseOptions(id)).toEqual(expected)
	})
})
