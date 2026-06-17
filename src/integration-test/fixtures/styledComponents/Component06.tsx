import styled from 'styled-components'

const StyledB = styled.div.attrs({ className: 'b' })`
	color: blue;
`

const StyledA = styled(StyledB).attrs({ className: 'a' })`
	color: red;
`

const Component06 = () => {
	return (
		<StyledA>
			<StyledA>xxx</StyledA>
			<StyledB>xxx</StyledB>
		</StyledA>
	)
}

export default Component06
