import renderFixture from 'integration-test/utils/renderFixture'

describe('childOverrideParent', () => {
	const options = { childOverrideParent: true }

	it('should inject data-qa after existing jsx attributes', () => {
		renderFixture({
			category: 'functionComponents',
			fileName: 'Component03.tsx',
			params: options,
		})
	})

	it('should inject data-qa after props spread in styled attrs callback', () => {
		renderFixture({
			category: 'styledComponents',
			fileName: 'Component07.tsx',
			params: options,
		})
	})
})
