describe('formatName()', () => {
	const { default: formatName } = require('.') as typeof import('.')

	it('should format name correctly ', () => {
		expect(formatName('paramsName', 'paramCase')).toBe('params-name')
	})
})
