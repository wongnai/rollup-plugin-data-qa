import { useMemo } from 'react'

const Component06 = () => {
	const B = useMemo(() => <div>xxx</div>, [])

	return <div>{B}</div>
}

export default Component06
