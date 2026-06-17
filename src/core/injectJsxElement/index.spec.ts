import MagicString from 'magic-string'

import { DATA_QA, IS_E2E_ENABLED } from 'pluginConstants'

describe('injectJsxElement()', () => {
	const { default: injectJsxElement } = require('.') as typeof import('.')

	const defaultParams = {
		code: new MagicString(''),
		componentName: 'button',
	}

	it('should return false when node is not a jsx element', () => {
		expect(
			injectJsxElement({
				...defaultParams,
				node: { type: 'CallExpression' },
			}),
		).toBe(false)
	})

	it('should return false when jsx element has no opening element', () => {
		expect(
			injectJsxElement({
				...defaultParams,
				node: { type: 'JSXElement' },
			}),
		).toBe(false)
	})

	it('should inject data-qa spread before existing jsx attributes', () => {
		const code = '<div className="a" />'
		const magicString = new MagicString(code)
		const classNameStart = code.indexOf('className')

		const result = injectJsxElement({
			code: magicString,
			componentName: 'button',
			node: {
				type: 'JSXElement',
				openingElement: {
					attributes: [{ start: classNameStart }],
					name: { end: code.indexOf(' ') },
				},
			},
		})

		expect(result).toBe(true)
		expect(magicString.toString()).toBe(
			`<div {...(${IS_E2E_ENABLED} && {"${DATA_QA}":"button"})} className="a" />`,
		)
	})

	it('should inject data-qa spread after jsx tag name when there are no attributes', () => {
		const code = '<div />'
		const magicString = new MagicString(code)

		const result = injectJsxElement({
			code: magicString,
			componentName: 'button',
			node: {
				type: 'JSXElement',
				openingElement: {
					attributes: [],
					name: { end: code.indexOf(' ') },
				},
			},
		})

		expect(result).toBe(true)
		expect(magicString.toString()).toBe(
			`<div{...(${IS_E2E_ENABLED} && {"${DATA_QA}":"button"})}  />`,
		)
	})

	it('should inject data-qa spread after existing jsx attributes when childOverrideParent is true', () => {
		const code = '<div className="a" />'
		const magicString = new MagicString(code)
		const classNameEnd = code.indexOf('"a"') + '"a"'.length

		const result = injectJsxElement({
			code: magicString,
			componentName: 'button',
			childOverrideParent: true,
			node: {
				type: 'JSXElement',
				openingElement: {
					attributes: [{ start: code.indexOf('className'), end: classNameEnd }],
					name: { end: code.indexOf(' ') },
				},
			},
		})

		expect(result).toBe(true)
		expect(magicString.toString()).toBe(
			`<div className="a" {...(${IS_E2E_ENABLED} && {"${DATA_QA}":"button"})} />`,
		)
	})
})
