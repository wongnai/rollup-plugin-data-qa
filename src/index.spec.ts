import { createFilter } from '@rollup/pluginutils'

describe('injectDataQa()', () => {
	it('should transform app source modules in production builds with html entry input', () => {
		const viteProductionInput = createFilter(['index.html'], ['**/node_modules/**'])
		const pluginModuleFilter = createFilter([], ['**/node_modules/**', '**/*.d.ts'])

		const moduleId = 'src/modules/lock-promotion/components/GetThisPromotionButton/index.tsx'

		expect(viteProductionInput(moduleId)).toBe(false)
		expect(pluginModuleFilter(moduleId)).toBe(true)
	})
})
