import { createFilter } from '@rollup/pluginutils'

import { DEFAULT_TRANSFORM_EXCLUDE } from 'pluginConstants'
import ensureArray from 'utils/ensureArray'

type Params = {
	input: string[]
	include?: string | string[]
	exclude?: string | string[]
}

export default function createModuleFilter({ input, include, exclude }: Params) {
	return createFilter(
		[...input, ...ensureArray(include)],
		[...DEFAULT_TRANSFORM_EXCLUDE, ...ensureArray(exclude)],
	)
}
