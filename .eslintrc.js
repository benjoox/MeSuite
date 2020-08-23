module.exports = {
    plugins: ['react', 'prettier'],
    extends: [
        'airbnb',
        'plugin:react/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'prettier',
        'prettier/react',
    ],
    parser: 'babel-eslint',
    rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'import/extensions': 0,
        'react/jsx-props-no-spreading': ['error', { custom: 'ignore' }],
    },
}
