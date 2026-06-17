import { useMemo } from 'react'

const useComponentProps = (status?: string) => {
	return useMemo(() => {
		switch (status) {
			case 'A':
				return {
					className: 'a',
					label: 'labelA',
					icon: <svg />,
				}
			case 'B':
				return {
					className: 'b',
					label: 'labelB',
					icon: <svg />,
				}
			default:
				return {
					className: 'default',
					label: 'labelDefault',
					icon: <svg />,
				}
		}
	}, [status])
}

const Component19 = ({ status }: { status?: string }) => {
	const props = useComponentProps(status)

	return (
		<div className={props.className}>
			<div>{props.icon}</div>
			<div>{props.label}</div>
		</div>
	)
}

export default Component19
