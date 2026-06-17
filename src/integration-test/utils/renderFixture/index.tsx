import { createElement } from 'react'

import { render } from '@testing-library/react'

import loadFixtureComponent from 'integration-test/utils/loadFixtureComponent'

import { RenderFixtureParams } from './types'

export default function renderFixture({
	category,
	fileName,
	params,
	snapshotTarget = 'firstChild',
}: RenderFixtureParams) {
	const Component = loadFixtureComponent(category, fileName, params)
	const { container } = render(createElement(Component))

	if (snapshotTarget === 'children') {
		expect(container.children).toMatchSnapshot()
		return
	}

	expect(container.firstChild).toMatchSnapshot()
}
