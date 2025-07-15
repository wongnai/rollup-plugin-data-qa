import { render, screen, within } from '../../utils/testUtils'
import Component01 from './Component01'
import Component02 from './Component02'
import Component03 from './Component03'
import Component04 from './Component04'
import Component05 from './Component05'
import Component06 from './Component06'
import Component07 from './Component07'
import Component08 from './Component08'

describe('styled components', () => {
	it('01 - styled component in a div', () => {
		const { container } = render(<Component01 />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('styled-a')).toBeVisible()
		expect(screen.getByDataQa('component01')).toBeVisible()
	})

	it('02 - returning styled component', () => {
		const { container } = render(<Component02 />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('component02')).toBeVisible()
		expect(screen.queryByDataQa('styled-a')).not.toBeInTheDocument()
	})

	it('03 - returning styled component but with useMemo above', () => {
		const { container } = render(<Component03 />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('component03')).toBeVisible()
		expect(screen.getByDataQa('b')).toBeVisible()
		expect(screen.queryByDataQa('styled-a')).not.toBeInTheDocument()
	})

	it('04 - component with attrs', () => {
		const { container } = render(<Component04 />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('styled-a')).toBeVisible()
	})

	it('05 - styled styled component', () => {
		const { container } = render(<Component05 />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('component05')).toBeVisible()
		expect(screen.getAllByDataQa('styled-b')).toHaveLength(2)
	})

	it('06 - styled styled component with attrs', () => {
		const { container } = render(<Component06 />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.queryByDataQa('component06')).not.toBeInTheDocument()
		expect(screen.getAllByDataQa('styled-a')).toHaveLength(2)
		expect(screen.getByDataQa('styled-b')).toBeVisible()
	})

	it('07 - styled with props function in attrs', () => {
		const { container } = render(<Component07 />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('component07')).toBeVisible()
		expect(within(screen.getByDataQa('component07')).getByDataQa('styled-a')).toBeVisible()
	})

	it('08 - component with custom hook that returns object with styled component', () => {
		const { container } = render(<Component08 />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('component08')).toBeVisible()
		expect(screen.getByDataQa('icon-default')).toBeVisible()
	})
})
