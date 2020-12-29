module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'prettier',
        'plugin:jsx-a11y/recommended',
        'prettier',
        'prettier/flowtype',
        'prettier/react',
    ],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: ['react', 'react-hooks'],
    rules: {
        'react/prop-types': 0,
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'no-shadow': [
            'error',
            { builtinGlobals: false, hoist: 'functions', allow: [] },
        ],
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    },
}
