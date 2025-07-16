import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { injectDataQa } from 'rollup-plugin-data-qa'

// https://vite.dev/config/
const config = defineConfig({
	plugins: [react(), injectDataQa()],
	test: {
		globals: true,
		environment: 'jsdom',
		forceRerunTriggers: ['../dist/**'],
		setupFiles: ['./vitest.setup.ts'],
		reporters: ['verbose'],
	},
	optimizeDeps: {
		include: ['rollup-plugin-data-qa'],
	},
})

export default config
