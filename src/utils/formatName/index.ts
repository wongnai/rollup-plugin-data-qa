import * as changeCase from 'change-case'

import { FormatType } from 'types'

type ChangeCase = (name: string, options?: changeCase.Options) => string

export default function formatName(name: string, format: FormatType) {
	return (changeCase[format] as ChangeCase)(name)
}
