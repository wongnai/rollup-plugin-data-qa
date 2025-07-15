import { useCallback } from 'react'

const Component05 = () => {
	const B = useCallback(() => <div>xxx</div>, [])

	return <div>{B()}</div>
}

export default Component05
