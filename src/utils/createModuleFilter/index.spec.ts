import { createFilter } from '@rollup/pluginutils'

import createModuleFilter from '.'

describe('createModuleFilter()', () => {
	it.each([
		['src/Component.tsx', true],
		['src/Component.jsx', true],
		['src/Component/styled.ts', true],
		['node_modules/react/index.js', false],
		['src/Component.d.ts', false],
	])('should return %s -> %s', (id, expected) => {
		const filter = createModuleFilter({
			include: [],
			exclude: [],
		})

		expect(filter(id)).toBe(expected)
	})

	it('should match app source modules even when rollup input is an html entry', () => {
		const htmlEntryFilter = createFilter(['index.html'], ['**/node_modules/**'])
		const filter = createModuleFilter({
			include: [],
			exclude: [],
		})
		const moduleId = 'src/modules/lock-promotion/components/GetThisPromotionButton/index.tsx'

		expect(htmlEntryFilter(moduleId)).toBe(false)
		expect(filter(moduleId)).toBe(true)
	})
})
