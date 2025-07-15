import { useMemo } from 'react'

const Component08 = () => {
	const data = ['xxx', 'yyy']
	const list = useMemo(() => data.map(item => <div key={item}>{item}</div>), [])

	return <div>{list}</div>
}

export default Component08
