describe('isReactNode()', () => {
	const { default: isReactNode } = require('.') as typeof import('.')

	it.each([
		[
			{
				callee: {
					object: { name: 'React' },
					property: { name: 'createElement' },
				},
			},
			true,
		],
		[{ callee: { name: 'jsx' } }, true],
		[{ callee: { name: 'jsxs' } }, true],
		[{ callee: { name: 'jsxDEV' } }, true],
		[{ callee: { name: '_jsxDEV' } }, true],
		[{ callee: { name: '_jsxDEV' }, arguments: [{ name: '_Fragment' }] }, false],
		[
			{
				callee: { name: 'jsx' },
				type: 'JSXElement',
				openingElement: { name: { name: 'Fragment' } },
			},
			false,
		],
		[{ callee: { name: 'console' } }, false],
		[{}, false],
	])('should detect react nodes', (node, expected) => {
		expect(isReactNode(node)).toBe(expected)
	})
})
