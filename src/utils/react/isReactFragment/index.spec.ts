describe('isReactFragment()', () => {
	const { default: isReactFragment } = require('.') as typeof import('.')

	it.each([
		[{ type: 'JSXFragment' }, true],
		[
			{
				type: 'JSXElement',
				openingElement: { name: { name: 'Fragment' } },
			},
			true,
		],
		[
			{
				type: 'JSXElement',
				openingElement: { name: { name: 'div' } },
			},
			false,
		],
		[{ type: 'CallExpression', arguments: [{ name: '_Fragment' }] }, true],
		[{ type: 'CallExpression', arguments: [{ name: 'div' }] }, false],
	])('should detect react fragment nodes', (node, expected) => {
		expect(isReactFragment(node)).toBe(expected)
	})
})
