import renderFixture from 'integration-test/utils/renderFixture'

const FIXTURE_CATEGORY = 'styledComponents'

describe('styled components', () => {
	it('01 - styled component in a div', () => {
		renderFixture({ category: FIXTURE_CATEGORY, fileName: 'Component01.tsx' })
	})

	it('02 - returning styled component', () => {
		renderFixture({ category: FIXTURE_CATEGORY, fileName: 'Component02.tsx' })
	})

	it('03 - returning styled component but with useMemo above', () => {
		renderFixture({ category: FIXTURE_CATEGORY, fileName: 'Component03.tsx' })
	})

	it('04 - component with attrs', () => {
		renderFixture({ category: FIXTURE_CATEGORY, fileName: 'Component04.tsx' })
	})

	it('05 - styled styled component', () => {
		renderFixture({ category: FIXTURE_CATEGORY, fileName: 'Component05.tsx' })
	})

	it('06 - styled styled component with attrs', () => {
		renderFixture({ category: FIXTURE_CATEGORY, fileName: 'Component06.tsx' })
	})

	it('07 - styled with props function in attrs', () => {
		renderFixture({ category: FIXTURE_CATEGORY, fileName: 'Component07.tsx' })
	})

	it('08 - component with custom hook that returns object with styled component', () => {
		renderFixture({ category: FIXTURE_CATEGORY, fileName: 'Component08.tsx' })
	})
})
