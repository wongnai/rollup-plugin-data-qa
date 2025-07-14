import React, { useCallback, useMemo } from 'react'
import { render, screen } from '../utils/testUtils'

describe('function components', () => {
	it('01 - simple arrow function', () => {
		const ComponentA = () => <div>xxx</div>

		const { container } = render(<ComponentA />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('component-a')).toBeVisible()
	})

	it('02 - simple return', () => {
		const ComponentA = () => {
			return <div>xxx</div>
		}

		const { container } = render(<ComponentA />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('component-a')).toBeVisible()
	})

	it('03 - simple component with some properties', () => {
		const ComponentA = () => {
			return (
				<div className="bello" id="bello">
					xxx
				</div>
			)
		}

		const { container } = render(<ComponentA />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('component-a')).toBeVisible()
	})

	it('04 - with a const element in function scope', () => {
		const ComponentA = () => {
			const B = <div>xxx</div>

			return <div>{B}</div>
		}

		const { container } = render(<ComponentA />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('component-a')).toBeVisible()
		expect(screen.getByDataQa('b')).toBeVisible()
	})

	it('05 - with a useCallback element in function scope', () => {
		const ComponentA = () => {
			const B = useCallback(() => <div>xxx</div>, [])

			return <div>{B()}</div>
		}

		const { container } = render(<ComponentA />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('component-a')).toBeVisible()
		expect(screen.getByDataQa('b')).toBeVisible()
	})

	it('06 - with a useMemo in function scope', () => {
		const ComponentA = () => {
			const B = useMemo(() => <div>xxx</div>, [])

			return <div>{B}</div>
		}
		const { container } = render(<ComponentA />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('component-a')).toBeVisible()
		expect(screen.getByDataQa('b')).toBeVisible()
	})

	it('07 - with a function component child element', () => {
		const ComponentA = () => {
			const B = () => <div>xxx</div>

			return (
				<div>
					<B />
				</div>
			)
		}
		const { container } = render(<ComponentA />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('component-a')).toBeVisible()
		expect(screen.getByDataQa('b')).toBeVisible()
	})

	it('08 - with list of elements in useMemo', () => {
		const data = ['xxx', 'yyy']
		const ComponentA = () => {
			const list = useMemo(() => data.map(item => <div key={item}>{item}</div>), [])

			return <div>{list}</div>
		}
		const { container } = render(<ComponentA />)

		expect(container.firstChild).toMatchSnapshot()
		expect(screen.getByDataQa('component-a')).toBeVisible()
		expect(screen.getAllByDataQa('list')).toHaveLength(2)
	})

	it('09 - fragment with list of elements', () => {
		const data = ['xxx', 'yyy']
		const ComponentA = () => {
			return (
				<>
					{data.map(item => (
						<div key={item}>{item}</div>
					))}
				</>
			)
		}
		const { container } = render(<ComponentA />)

		expect(container.children).toMatchSnapshot()
		expect(screen.queryAllByDataQa(/.*/g)).toHaveLength(0)
	})

	it('10 - fragment with list of elements in a const', () => {
		const data = ['xxx', 'yyy']
		const ComponentA = () => {
			const list = data.map(item => <div key={item}>{item}</div>)

			return <>{list}</>
		}
		const { container } = render(<ComponentA />)

		expect(container.children).toMatchSnapshot()
		expect(screen.queryAllByDataQa('list')).toHaveLength(2)
	})

	it('11 - fragment with list of elements in useMemo', () => {
		const data = ['xxx', 'yyy']
		const ComponentA = () => {
			const list = useMemo(() => data.map(item => <div key={item}>{item}</div>), [])

			return <>{list}</>
		}
		const { container } = render(<ComponentA />)

		expect(container.children).toMatchSnapshot()
		expect(screen.queryAllByDataQa('list')).toHaveLength(2)
	})

	it('12 - with a function component outside of function scope', () => {
		const ComponentB = ({ children }: { children: React.ReactNode }) => {
			return <div>{children}</div>
		}

		const ComponentA = () => {
			return <ComponentB>xxx</ComponentB>
		}

		const { container } = render(<ComponentA />)

		expect(container.firstChild).toMatchSnapshot()
	})

	it('13 - with a function component with spreaded props', () => {
		const ComponentB = ({ children, ...props }: any) => {
			return <div {...props}>{children}</div>
		}

		const ComponentA = () => {
			return <ComponentB>xxx</ComponentB>
		}

		const { container } = render(<ComponentA />)

		expect(container.firstChild).toMatchSnapshot()
	})
})
