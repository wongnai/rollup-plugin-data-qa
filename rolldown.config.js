import { createRequire } from 'node:module'

import copy from 'rollup-plugin-copy'
import { defineConfig } from 'rolldown'
import { dts } from 'rolldown-plugin-dts'

const require = createRequire(import.meta.url)
const config = require('./package.json')

const external = Object.keys(config.dependencies)

const sharedConfig = {
	input: 'src/index.ts',
	external,
	platform: 'node',
}

export default defineConfig([
	{
		...sharedConfig,
		plugins: [
			dts({
				resolver: 'oxc',
				tsconfig: 'tsconfig.build.json',
			}),
			copy({
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
		output: {
			dir: config.deploy,
			format: 'esm',
			preserveModules: true,
			preserveModulesRoot: 'src',
			entryFileNames: '[name].js',
		},
	},
	{
		...sharedConfig,
		output: {
			dir: config.deploy,
			format: 'cjs',
			preserveModules: true,
			preserveModulesRoot: 'src',
			entryFileNames: '[name].cjs',
		},
	},
])
