module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:i18next/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'i18next'],
    rules: {
        'react/jsx-indent': [2, 4], // отступы
        'react/jsx-indent-props': [2, 4],
        indent: [2, 4],
        // 'linebreak-style': ['error', 'unix'], // перенос строки windows / unix
        'linebreak-style': 0,
        'react/jsx-filename-extension': [
            2,
            {
                extensions: ['.js', '.jsx', '.tsx'],
            },
        ], // Файлы в которых можно использовать jsx
        'react/function-component-definition': [
            2,
            {
                namedComponents: ['function-expression', 'arrow-function'],
                unnamedComponents: ['function-expression', 'arrow-function'],
            },
        ], // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
        'max-len': ['error', { ignoreComments: true }], // https://eslint.org/docs/latest/rules/max-len | https://stackoverflow.com/questions/61631356/react-typescript-eslint-max-length-autofix-does-not-work
        'no-unused-vars': 'warn', // no user variabels
        'react/jsx-props-no-spreading': 'warn',
        'import/no-extraneous-dependencies': 'warn',
        'dot-notation': 'off',
        'react/react-in-jsx-scope': 'off', // import react - from react v17 not needed
        'import/no-unresolved': 'off', // запрещает import требует requier
        'import/prefer-default-export': 'off', // default export
        'no-shadow': 'off', // https://eslint.org/docs/latest/rules/no-shadow
        'react/require-default-props': 'off', // нельзя использовать переменную без деволтного значения
        'import/extensions': 'off',
        'no-underscore-dangle': 'off',
        'i18next/no-literal-string': [
            'error',
            {
                markupOnly: true,
                ignoreAttribute: ['to', 'data-testid'],
            },
        ],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    globals: {
        __IS_DEV__: true,
    },
    overrides: [
        {
            files: ['**/src/**/*.test.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off',
            },
        },
    ],
}
