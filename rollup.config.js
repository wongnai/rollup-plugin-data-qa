import { cjs } from '@lmwn/kyo-rollup'

const cjsBundle = cjs({
	options: {
		includepaths: true,
	},
})

export default [cjsBundle]
