module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: ['airbnb', 'plugin:react/recommended', 'plugin:i18next/recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'i18next', 'react-hooks'],
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
        'max-len': ['error', { ignoreComments: true, code: 120 }], // https://eslint.org/docs/latest/rules/max-len | https://stackoverflow.com/questions/61631356/react-typescript-eslint-max-length-autofix-does-not-work
        'react-hooks/rules-of-hooks': 'error', // Проверяем правила хуков
        'react-hooks/exhaustive-deps': 'error', // Проверяем зависимости эффекта
        'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
        'no-unused-vars': 'warn', // no user variabels
        'react/jsx-props-no-spreading': 'warn',
        'import/no-extraneous-dependencies': 'warn',
        'arrow-body-style': 'warn',
        'dot-notation': 'off',
        'react/react-in-jsx-scope': 'off', // import react - from react v17 not needed
        'import/no-unresolved': 'off', // запрещает import требует requier
        'import/prefer-default-export': 'off', // default export
        'no-shadow': 'off', // https://eslint.org/docs/latest/rules/no-shadow
        'react/require-default-props': 'off', // нельзя использовать переменную без деволтного значения
        'import/extensions': 'off',
        'no-underscore-dangle': 'off',
        'react/display-name': 'off',
        'no-undef': 'off',
        'react/no-array-index-key': 'off',
        'i18next/no-literal-string': [
            'error',
            {
                markupOnly: true,
                ignoreAttribute: ['to', 'data-testid'],
            },
        ],
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'no-param-reassign': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    globals: {
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true,
    },
    overrides: [
        {
            files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off',
                'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
                'max-len': 'off',
            },
        },
    ],
}
