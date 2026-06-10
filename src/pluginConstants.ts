export const IS_E2E_ENABLED = "process.env.E2E_ENABLED === 'true'"

export const UNCHANGED = null

export const DATA_QA = 'data-qa'

export const JSX_CALLEE_NAMES = ['jsxDEV', 'jsx', '_jsx', 'jsxs', '_jsxs']

export const FRAGMENT_NAMES = ['Fragment', '_Fragment']

export const DEFAULT_STYLED_COMPONENT_NAMES = ['styled']

export const TRANSFORM_HOOK_ID_FILTER = [/\.tsx$/, /\.jsx$/, /\.js$/, /(?:^|\/)styled\.ts$/]

export const DEFAULT_TRANSFORM_EXCLUDE = ['**/node_modules/**', '**/*.d.ts']
