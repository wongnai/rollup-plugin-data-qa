import without from 'lodash/without'
import path from 'path'
import cleaner from 'rollup-plugin-cleaner'
import copyTo from 'rollup-plugin-copy'
import multiInput from 'rollup-plugin-multi-input'
import { terser } from 'rollup-plugin-terser'
import visualizer from 'rollup-plugin-visualizer'
import typescript from 'ttypescript'

import { optimizeLodashImports } from '@optimize-lodash/rollup-plugin'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import ts from '@rollup/plugin-typescript'
import { createFilter } from '@rollup/pluginutils'

import config from './package.json'

const EXTERNAL = without(Object.keys(config.dependencies)).map(dep => new RegExp(`^${dep}`))

const external = createFilter(EXTERNAL, null, {
	resolve: false,
})

const cjsBundle = {
	input: ['src/**/!(*.spec|*.d).ts', '!src/mocks/**/*'],
	output: {
		exports: 'named',
		format: 'cjs',
		dir: config.deploy,
		sourcemap: true,
	},
	external,
	plugins: [
		cleaner({
			targets: [config.deploy],
		}),
		multiInput(),
		commonjs(),
		resolve(),
		optimizeLodashImports(),
		ts({
			typescript,
			tsconfig: './tsconfig.json',
			outDir: config.deploy,
			noEmit: false,
			declaration: true,
			emitDeclarationOnly: true,
			include: ['src/**/*.ts'],
			exclude: ['src/**/*.spec.ts', 'src/mocks/**/*'],
		}),
		terser(),
		visualizer({
			filename: path.resolve(config.deploy, 'stat.html'),
		}),
		copyTo({
			targets: [
				{
					src: './package.json',
					dest: config.deploy,
				},
			],
		}),
	],
}

export default [cjsBundle]
