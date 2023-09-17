import ensureArray from '.'

describe('ensureArray()', () => {
	it.each([
		['a', ['a']],
		[['a'], ['a']],
		[[], []],
		[{}, [{}]],
		['', ['']],
	])('should return value in the form of an array', (value, valueArray) => {
		expect(ensureArray(value)).toEqual(valueArray)
	})

	it('should return empty array when value is undefined, null or NaN', () => {
		expect(ensureArray(undefined)).toEqual([])
		expect(ensureArray(null)).toEqual([])
		expect(ensureArray(NaN)).toEqual([])
	})
})
