import styled from 'styled-components'

const StyledA = styled.div.attrs(props => ({ ...props, className: 'a' }))`
	color: red;
`

const Component07 = () => {
	return (
		<StyledA>
			<StyledA>xxx</StyledA>
		</StyledA>
	)
}

export default Component07
