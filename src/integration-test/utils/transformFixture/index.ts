import { parse as babelParse, ParserOptions } from '@babel/parser'

import { injectDataQa } from 'index'
import readFixture from 'integration-test/utils/readFixture'
import { InjectDataQaParams, PluginTransformContext } from 'types'

const getParserPlugins = (options?: { lang?: string; jsx?: boolean }): ParserOptions['plugins'] => {
	const plugins: ParserOptions['plugins'] = []

	if (options?.jsx || options?.lang === 'tsx' || options?.lang === 'jsx') {
		plugins.push('jsx', 'typescript')
	} else if (options?.lang === 'ts') {
		plugins.push('typescript')
	}

	return plugins
}

const createPluginContext = (): PluginTransformContext => ({
	parse: (code, options) =>
		babelParse(code, {
			sourceType: 'module',
			plugins: getParserPlugins(options),
		}) as ReturnType<PluginTransformContext['parse']>,
	warn: jest.fn(),
})

export default function transformFixture(
	category: string,
	fileName: string,
	params?: InjectDataQaParams,
) {
	const code = readFixture(category, fileName)
	const moduleId = `src/integration-test/fixtures/${category}/${fileName}`
	const plugin = injectDataQa(params)
	const result = plugin.transform!.call(createPluginContext(), code, moduleId)

	return result?.code ?? code
}
