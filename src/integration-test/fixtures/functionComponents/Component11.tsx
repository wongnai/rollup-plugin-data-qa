import { useMemo } from 'react'

const Component11 = () => {
	const data = ['xxx', 'yyy']
	const list = useMemo(() => data.map(item => <div key={item}>{item}</div>), [])

	return <>{list}</>
}

export default Component11
