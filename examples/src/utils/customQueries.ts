import { queryHelpers, buildQueries, Matcher, MatcherOptions } from '@testing-library/react'

const QA_TEST_ID_ATTRIBUTE = 'data-qa'

const queryAllByDataQa = (container: HTMLElement, id: Matcher, options?: MatcherOptions) =>
	queryHelpers.queryAllByAttribute(QA_TEST_ID_ATTRIBUTE, container, id, options)

const getMultipleError = (_: unknown, dataQaValue: string) =>
	`Found multiple elements with the ${QA_TEST_ID_ATTRIBUTE} attribute of: ${dataQaValue}`
const getMissingError = (_: unknown, dataQaValue: string) =>
	`Unable to find an element with the ${QA_TEST_ID_ATTRIBUTE} attribute of: ${dataQaValue}`

const [queryByDataQa, getAllByDataQa, getByDataQa, findAllByDataQa, findByDataQa] = buildQueries(
	queryAllByDataQa,
	getMultipleError,
	getMissingError,
)

export {
	queryByDataQa,
	queryAllByDataQa,
	getByDataQa,
	getAllByDataQa,
	findAllByDataQa,
	findByDataQa,
}
