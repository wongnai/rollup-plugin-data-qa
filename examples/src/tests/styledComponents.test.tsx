import styled from 'styled-components'
import { render } from '@testing-library/react'
import { screen } from '../utils/testUtils'
import { useMemo } from 'react'

describe('styled components', () => {
	it('01 - styled component in a div', () => {
		const StyledA = styled.div`
			color: red;
		`

		const ComponentA = () => {
			return (
				<div>
					<StyledA>xxx</StyledA>
				</div>
			)
		}

		const { container } = render(<ComponentA />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('styled-a')).toBeVisible()
		expect(screen.getByDataQa('component-a')).toBeVisible()
	})

	it('02 - returning styled component', () => {
		const StyledA = styled.div`
			color: red;
		`

		const ComponentA = () => {
			return <StyledA>xxx</StyledA>
		}

		const { container } = render(<ComponentA />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('component-a')).toBeVisible()
		expect(screen.queryByDataQa('styled-a')).not.toBeInTheDocument()
	})

	it('03 - returning styled component but with useMemo above', () => {
		const StyledA = styled.div`
			color: red;
		`

		const ComponentA = () => {
			const B = useMemo(() => <div>xxx</div>, [])

			return <StyledA>{B}</StyledA>
		}

		const { container } = render(<ComponentA />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('component-a')).toBeVisible()
		expect(screen.getByDataQa('b')).toBeVisible()
		expect(screen.queryByDataQa('styled-a')).not.toBeInTheDocument()
	})
})
