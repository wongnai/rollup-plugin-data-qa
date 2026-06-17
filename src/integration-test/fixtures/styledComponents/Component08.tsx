import { useMemo } from 'react'
import styled from 'styled-components'

const IconA = styled.svg`
	color: red;
`

const IconB = styled.svg`
	color: blue;
`

const IconDefault = styled.svg`
	color: green;
`

const useComponentProps = (status?: string) => {
	return useMemo(() => {
		switch (status) {
			case 'A':
				return {
					className: 'a',
					label: 'labelA',
					icon: <IconA />,
				}
			case 'B':
				return {
					className: 'b',
					label: 'labelB',
					icon: <IconB />,
				}
			default:
				return {
					className: 'default',
					label: 'labelDefault',
					icon: <IconDefault />,
				}
		}
	}, [status])
}

const Component08 = ({ status }: { status?: string }) => {
	const props = useComponentProps(status)

	return (
		<div className={props.className}>
			<div>{props.icon}</div>
			<div>{props.label}</div>
		</div>
	)
}

export default Component08
