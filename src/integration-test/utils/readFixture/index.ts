import fs from 'fs'
import path from 'path'

import { FIXTURES_ROOT } from './constants'

export default function readFixture(category: string, fileName: string) {
	return fs.readFileSync(path.join(FIXTURES_ROOT, category, fileName), 'utf8')
}
