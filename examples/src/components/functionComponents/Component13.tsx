const ComponentB = ({ children, ...props }: any) => {
	return <div {...props}>{children}</div>
}

const Component13 = () => {
	return <ComponentB>xxx</ComponentB>
}

export default Component13
