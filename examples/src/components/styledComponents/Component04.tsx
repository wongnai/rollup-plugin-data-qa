import styled from 'styled-components'

const StyledA = styled.div.attrs({ className: 'a' })`
	color: red;
`

const Component04 = () => {
	return <StyledA>xxx</StyledA>
}

export default Component04
