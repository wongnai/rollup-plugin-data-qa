module.exports = {
	moduleFileExtensions: ['json', 'tsx', 'ts', 'js'],
	transform: {
		'^.+\\.(ts|tsx)?$': 'ts-jest',
		'.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
	},
	testRegex: '((\\.|/)(test|spec))\\.(tsx?)$',
	transformIgnorePatterns: ['/node_modules/'],
	moduleDirectories: ['node_modules', 'src'],
	coverageReporters: ['cobertura', 'lcov', 'json', 'text'],
	coverageThreshold: {
		global: {
			statements: 80,
			branches: 80,
			functions: 80,
			lines: 80,
		},
	},
	collectCoverageFrom: [
		'src/**/*.{ts,tsx}',
		'!src/**/*.stories.{ts,tsx}',
		'!src/**/*.d.ts',
		'!src/**/types.ts',
		'!src/**/styled.{ts,tsx}',
		'!src/**/constants.{ts,tsx}',
		'!src/types/index.ts',
		'!src/**/mocks/*.ts',
		'!src/**/locale.ts',
		'!src/icons/**/*',
	],
}
