describe('isJsxElement()', () => {
	const { default: isJsxElement } = require('.') as typeof import('.')

	it.each([
		[{ type: 'JSXElement' }, true],
		[{ type: 'CallExpression' }, false],
		[{}, false],
		[null, false],
	])('should return %s -> %s', (node, expected) => {
		expect(isJsxElement(node as Record<string, any>)).toBe(expected)
	})
})
