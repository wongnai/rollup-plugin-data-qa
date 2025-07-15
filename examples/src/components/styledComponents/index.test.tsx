import { render, screen } from '../../utils/testUtils'
import Component01 from './Component01'
import Component02 from './Component02'
import Component03 from './Component03'

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
})
