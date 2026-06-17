import styled from 'styled-components'

const StyledB = styled.div`
	color: blue;
`

const StyledA = styled(StyledB)`
	color: red;
`

const Component05 = () => {
	return (
		<StyledA>
			<StyledA>aaa</StyledA>
			<StyledB>bbb</StyledB>
		</StyledA>
	)
}

export default Component05
