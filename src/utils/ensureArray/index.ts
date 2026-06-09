export default function ensureArray<T>(value?: T | T[]): T[] {
	if (value == null || (typeof value === 'number' && Number.isNaN(value))) {
		return []
	}

	return Array.isArray(value) ? value : [value]
}
