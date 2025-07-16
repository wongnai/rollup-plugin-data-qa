import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { injectDataQa } from 'rollup-plugin-data-qa'

// https://vite.dev/config/
const config = defineConfig({
	plugins: [react(), injectDataQa()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./vitest.setup.ts'],
		reporters: ['verbose'],
	},
})

export default config
