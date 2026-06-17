import vm from 'vm'

import { transformSync } from '@babel/core'
import { ComponentType } from 'react'

import transformFixture from 'integration-test/utils/transformFixture'
import { InjectDataQaParams } from 'types'

const createFixtureRequire = () => {
	const fixtureRequire = (id: string) => {
		switch (id) {
			case 'react':
				return require('react')
			case 'react/jsx-runtime':
				return require('react/jsx-runtime')
			case 'styled-components':
				return require('styled-components')
			default:
				throw new Error(`Cannot require module: ${id}`)
		}
	}

	return fixtureRequire
}

export default function loadFixtureComponent(
	category: string,
	fileName: string,
	params?: InjectDataQaParams,
): ComponentType {
	const source = transformFixture(category, fileName, params)
	const compiled = transformSync(source, {
		filename: fileName,
		presets: [
			['@babel/preset-env', { modules: 'commonjs' }],
			['@babel/preset-react', { runtime: 'automatic' }],
			['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
		],
	})?.code

	if (!compiled) {
		throw new Error(`Failed to compile fixture: ${category}/${fileName}`)
	}

	const module = { exports: {} as { default?: ComponentType } }

	vm.runInNewContext(compiled, {
		module,
		exports: module.exports,
		require: createFixtureRequire(),
		process: {
			env: {
				...process.env,
				E2E_ENABLED: 'true',
			},
		},
	})

	if (!module.exports.default) {
		throw new Error(`Fixture has no default export: ${category}/${fileName}`)
	}

	return module.exports.default
}
