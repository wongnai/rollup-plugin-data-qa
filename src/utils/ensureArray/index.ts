import { isArray, isNaN, isNil } from 'lodash'

export default function ensureArray(value?: any) {
	if (isNaN(value) || isNil(value)) {
		return []
	}

	return isArray(value) ? value : [value]
}
