import { render, screen } from '../../utils/testUtils'
import Component01 from './Component01'
import Component02 from './Component02'
import Component03 from './Component03'
import Component04 from './Component04'
import Component05 from './Component05'
import Component06 from './Component06'
import Component07 from './Component07'
import Component08 from './Component08'
import Component09 from './Component09'
import Component10 from './Component10'
import Component11 from './Component11'
import Component12 from './Component12'
import Component13 from './Component13'
import Component14 from './Component14'
import Component15 from './Component15'
import Component16 from './Component16'
import Component17 from './Component17'
import Component18 from './Component18'
import Component19 from './Component19'

describe('function components', () => {
	it('01 - simple arrow function', () => {
		const { container } = render(<Component01 />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('component01')).toBeVisible()
	})

	it('02 - simple return', () => {
		const { container } = render(<Component02 />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('component02')).toBeVisible()
	})

	it('03 - simple component with some properties', () => {
		const { container } = render(<Component03 />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('component03')).toBeVisible()
	})

	it('04 - with a const element in function scope', () => {
		const { container } = render(<Component04 />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('component04')).toBeVisible()
		expect(screen.getByDataQa('b')).toBeVisible()
	})

	it('05 - with a useCallback element in function scope', () => {
		const { container } = render(<Component05 />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('component05')).toBeVisible()
		expect(screen.getByDataQa('b')).toBeVisible()
	})

	it('06 - with a useMemo in function scope', () => {
		const { container } = render(<Component06 />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('component06')).toBeVisible()
		expect(screen.getByDataQa('b')).toBeVisible()
	})

	it('07 - with a function component child element', () => {
		const { container } = render(<Component07 />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('component07')).toBeVisible()
		expect(screen.getByDataQa('b')).toBeVisible()
	})

	it('08 - with list of elements in useMemo', () => {
		const { container } = render(<Component08 />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('component08')).toBeVisible()
		expect(screen.getAllByDataQa('list')).toHaveLength(2)
	})

	it('09 - fragment with list of elements', () => {
		const { container } = render(<Component09 />)

		expect(container.children).toMatchSnapshot()
		expect(screen.queryAllByDataQa(/.*/g)).toHaveLength(0)
	})

	it('10 - fragment with list of elements in a const', () => {
		const { container } = render(<Component10 />)

		expect(container.children).toMatchSnapshot()
		expect(screen.queryAllByDataQa('list')).toHaveLength(2)
	})

	it('11 - fragment with list of elements in useMemo', () => {
		const { container } = render(<Component11 />)

		expect(container.children).toMatchSnapshot()
		expect(screen.queryAllByDataQa('list')).toHaveLength(2)
	})

	it('12 - with a function component outside of function scope', () => {
		const { container } = render(<Component12 />)

		expect(container.firstChild).toMatchSnapshot()
	})

	it('13 - with a function component with spreaded props', () => {
		const { container } = render(<Component13 />)

		expect(container.firstChild).toMatchSnapshot()
	})

	it('14 - wrapped with forwardRef', () => {
		const { container } = render(<Component14 />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('component14')).toBeVisible()
	})

	it('15 - fragment with empty div', () => {
		const { container } = render(<Component15 />)

		expect(container.children).toMatchSnapshot()
		expect(screen.queryAllByDataQa(/.*/g)).toHaveLength(0)
	})

	it('16 - fragment with list of elements from const', () => {
		const { container } = render(<Component16 />)

		expect(container.children).toMatchSnapshot()
		expect(screen.queryAllByDataQa('list')).toHaveLength(2)
	})

	it('17 - component with JSX const but returns null', () => {
		const { container } = render(<Component17 />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.queryAllByDataQa(/.*/g)).toHaveLength(0)
	})

	it('18 - component with a variable in function scope', () => {
		const { container } = render(<Component18 />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('component18')).toBeVisible()
		expect(screen.queryByDataQa('x')).not.toBeInTheDocument()
	})

	it('19 - component calling a custom hook', () => {
		const { container } = render(<Component19 />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('component19')).toBeVisible()
		expect(screen.queryAllByDataQa(/.*/)).toHaveLength(1)
	})
})
