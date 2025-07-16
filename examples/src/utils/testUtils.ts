import { ReactElement } from 'react'

import {
	render,
	queries,
	within,
	RenderOptions,
	screen as defaultScreen,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as customQueries from './customQueries'

const allQueries = {
	...queries,
	...customQueries,
}

type CustomRenderOptions = RenderOptions

const customScreen = within(document.body, allQueries)
const customWithin = (element: HTMLElement) => within(element, allQueries)
const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
	return render(ui, {
		queries: allQueries,
		...options,
	})
}

export * from '@testing-library/react'
export {
	customScreen as screen,
	customWithin as within,
	customRender as render,
	userEvent,
	defaultScreen,
}
