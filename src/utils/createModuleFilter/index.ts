import { createFilter } from '@rollup/pluginutils'

import { DEFAULT_TRANSFORM_EXCLUDE } from 'pluginConstants'
import ensureArray from 'utils/ensureArray'

type Params = {
	include?: string | string[]
	exclude?: string | string[]
}

export default function createModuleFilter({ include, exclude }: Params) {
	return createFilter(ensureArray(include), [...DEFAULT_TRANSFORM_EXCLUDE, ...ensureArray(exclude)])
}
