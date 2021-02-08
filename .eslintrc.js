module.exports = {
	'env': {
		'commonjs': true,
		'es2021': true,
		'node': true,
	},
	'extends': [
		'eslint:recommended',
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 12,
	},
	'plugins': [
		'@typescript-eslint',
	],
	'rules': {
		'linebreak-style': [
			'error',
			'unix',
		],
		'quotes': [
			'error',
			'single',
		],
		'semi': [
			'error',
			'never',
		],
		'no-unreachable': 'error',
		'eqeqeq': 'error',
		'default-case': 'error',
		'curly': 'error',
		'no-case-declarations': 'error',
		'no-shadow': ['error', { 'builtinGlobals': true, 'hoist': 'never' }],
		'no-self-assign': 'error',
		'no-self-compare': 'error',
		'comma-dangle': ['error', {
			'arrays': 'always-multiline',
			'objects': 'always-multiline',
			'imports': 'never',
			'exports': 'never',
			'functions': 'never',
		}],
		'camelcase': ['error', { 'properties': 'never' }],
		'array-bracket-spacing': ['error', 'never'],
		'block-spacing': ['error', 'always'],
		'brace-style': ['error', '1tbs'],
		'comma-spacing': ['error', { 'before': false, 'after': true }],
		'comma-style': ['error', 'last'],
		'computed-property-spacing': ['error', 'never'],
		'key-spacing': 'error',
		'no-mixed-spaces-and-tabs': 'error',
		'no-mixed-operators': ['error', {
			'groups': [
				['&', '|', '^', '~', '<<', '>>', '>>>'],
				['&&', '||'],
			],
			'allowSamePrecedence': true,
		}],
	},
}
