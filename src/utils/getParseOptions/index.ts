import { ParseOptions } from './types'

export default function getParseOptions(id: string): ParseOptions {
	if (id.endsWith('.tsx')) {
		return { lang: 'tsx', jsx: true }
	}

	if (id.endsWith('.jsx')) {
		return { lang: 'jsx', jsx: true }
	}

	if (id.endsWith('.ts') && !id.endsWith('.d.ts')) {
		return { lang: 'ts' }
	}

	return { lang: 'js' }
}
