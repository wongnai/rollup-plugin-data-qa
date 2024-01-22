import without from 'lodash/without'

import copyTo from 'rollup-plugin-copy'
import { terser } from 'rollup-plugin-terser'
import ttypescript from 'ttypescript'

import { optimizeLodashImports } from '@optimize-lodash/rollup-plugin'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { createFilter } from '@rollup/pluginutils'
import ts from 'rollup-plugin-ts'

import config from './package.json'

const EXTERNAL = without(Object.keys(config.dependencies)).map(dep => new RegExp(`^${dep}`))

const external = createFilter(EXTERNAL, null, {
	resolve: false,
})

const generateBundle = format => {
	const isCJS = format === 'cjs'
	const isESM = format === 'esm'

	return {
		input: ['src/index.ts'],
		output: {
			exports: 'named',
			format,
			dir: config.deploy,
			entryFileNames: `[name].${isCJS ? 'c' : ''}js`,
		},
		external,
		plugins: [
			commonjs(),
			resolve(),
			ts({
				typescript: ttypescript,
				tsconfig: {
					fileName: 'tsconfig.json',
					hook: resolvedConfig => ({ ...resolvedConfig, declaration: isESM }),
				},
				include: ['src/**/*.ts'],
				exclude: ['src/**/*.spec.ts', 'src/mocks/**/*'],
			}),
			optimizeLodashImports(),
			terser(),
			copyTo({
				targets: [
					{
						src: './package.json',
						dest: config.deploy,
					},
					{
						src: './README.md',
						dest: config.deploy,
					},
				],
			}),
		],
	}
}

export default [generateBundle('cjs'), generateBundle('esm')]
