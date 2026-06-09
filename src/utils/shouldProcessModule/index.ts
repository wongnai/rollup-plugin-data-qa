const STYLED_TS_PATTERN = /(?:^|\/)styled\.ts$/

export default function shouldProcessModule(id: string): boolean {
	if (id.endsWith('.d.ts')) {
		return false
	}

	if (id.endsWith('.tsx') || id.endsWith('.jsx')) {
		return true
	}

	if (id.endsWith('.ts')) {
		return STYLED_TS_PATTERN.test(id)
	}

	return true
}
