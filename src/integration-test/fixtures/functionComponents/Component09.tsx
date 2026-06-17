const Component09 = () => {
	const data = ['xxx', 'yyy']
	return (
		<>
			{data.map(item => (
				<div key={item}>{item}</div>
			))}
		</>
	)
}

export default Component09
