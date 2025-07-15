import styled from 'styled-components'
import { useMemo } from 'react'

const StyledA = styled.div`
	color: red;
`

const Component03 = () => {
	const B = useMemo(() => <div>xxx</div>, [])

	return <StyledA>{B}</StyledA>
}

export default Component03
