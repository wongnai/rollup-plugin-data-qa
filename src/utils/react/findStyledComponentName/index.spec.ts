describe('findStyledComponentName()', () => {
	const { default: findStyledComponentName } = require('.') as typeof import('.')

	it.each([
		[{ type: 'VariableDeclarator', id: { name: 'StyledButton' } }, 'StyledButton'],
		[{ type: 'VariableDeclarator', id: null }, ''],
		[{ type: 'CallExpression' }, ''],
		[{}, ''],
	])('should return styled component name from variable declarator', (node, expected) => {
		expect(findStyledComponentName(node)).toBe(expected)
	})
})
