import renderFixture from 'integration-test/utils/renderFixture'

const FIXTURE_CATEGORY = 'functionComponents'

describe('function components', () => {
	it('01 - simple arrow function', () => {
		renderFixture({ category: FIXTURE_CATEGORY, fileName: 'Component01.tsx' })
	})

	it('02 - simple return', () => {
		renderFixture({ category: FIXTURE_CATEGORY, fileName: 'Component02.tsx' })
	})

	it('03 - simple component with some properties', () => {
		renderFixture({ category: FIXTURE_CATEGORY, fileName: 'Component03.tsx' })
	})

	it('04 - with a const element in function scope', () => {
		renderFixture({ category: FIXTURE_CATEGORY, fileName: 'Component04.tsx' })
	})

	it('05 - with a useCallback element in function scope', () => {
		renderFixture({ category: FIXTURE_CATEGORY, fileName: 'Component05.tsx' })
	})

	it('06 - with a useMemo in function scope', () => {
		renderFixture({ category: FIXTURE_CATEGORY, fileName: 'Component06.tsx' })
	})

	it('07 - with a function component child element', () => {
		renderFixture({ category: FIXTURE_CATEGORY, fileName: 'Component07.tsx' })
	})

	it('08 - with list of elements in useMemo', () => {
		renderFixture({ category: FIXTURE_CATEGORY, fileName: 'Component08.tsx' })
	})

	it('09 - fragment with list of elements', () => {
		renderFixture({
			category: FIXTURE_CATEGORY,
			fileName: 'Component09.tsx',
			snapshotTarget: 'children',
		})
	})

	it('10 - fragment with list of elements in a const', () => {
		renderFixture({
			category: FIXTURE_CATEGORY,
			fileName: 'Component10.tsx',
			snapshotTarget: 'children',
		})
	})

	it('11 - fragment with list of elements in useMemo', () => {
		renderFixture({
			category: FIXTURE_CATEGORY,
			fileName: 'Component11.tsx',
			snapshotTarget: 'children',
		})
	})

	it('12 - with a function component outside of function scope', () => {
		renderFixture({ category: FIXTURE_CATEGORY, fileName: 'Component12.tsx' })
	})

	it('13 - with a function component with spreaded props', () => {
		renderFixture({ category: FIXTURE_CATEGORY, fileName: 'Component13.tsx' })
	})

	it('14 - wrapped with forwardRef', () => {
		renderFixture({ category: FIXTURE_CATEGORY, fileName: 'Component14.tsx' })
	})

	it('15 - fragment with empty div', () => {
		renderFixture({
			category: FIXTURE_CATEGORY,
			fileName: 'Component15.tsx',
			snapshotTarget: 'children',
		})
	})

	it('16 - fragment with list of elements from const', () => {
		renderFixture({
			category: FIXTURE_CATEGORY,
			fileName: 'Component16.tsx',
			snapshotTarget: 'children',
		})
	})

	it('17 - component with JSX const but returns null', () => {
		renderFixture({ category: FIXTURE_CATEGORY, fileName: 'Component17.tsx' })
	})

	it('18 - component with a variable in function scope', () => {
		renderFixture({ category: FIXTURE_CATEGORY, fileName: 'Component18.tsx' })
	})

	it('19 - component calling a custom hook', () => {
		renderFixture({ category: FIXTURE_CATEGORY, fileName: 'Component19.tsx' })
	})
})
