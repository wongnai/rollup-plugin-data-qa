describe('isObjectAssigning()', () => {
	const { default: isObjectAssigning } = require('.') as typeof import('.')

	it.each([
		[
			{
				callee: {
					object: { name: 'Object' },
					property: { name: 'assign' },
				},
			},
			true,
		],
		[
			{
				callee: {
					object: { name: 'Object' },
					property: { name: 'keys' },
				},
			},
			false,
		],
		[{}, false],
	])('should detect Object.assign call expressions', (node, expected) => {
		expect(isObjectAssigning(node)).toBe(expected)
	})
})
