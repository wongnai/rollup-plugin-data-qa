import React from 'react'

const ComponentB = ({ children }: { children: React.ReactNode }) => {
	return <div>{children}</div>
}

const Component12 = () => {
	return <ComponentB>xxx</ComponentB>
}

export default Component12
