const Component10 = () => {
	const data = ['xxx', 'yyy']
	const list = data.map(item => <div key={item}>{item}</div>)

	return <>{list}</>
}

export default Component10
