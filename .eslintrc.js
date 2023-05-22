module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'airbnb',
        'plugin:react/recommended',
        'plugin:i18next/recommended',
        'prettier',
        'plugin:storybook/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'i18next', 'react-hooks', 'ivp-fsd-path-checker-plugin', 'unused-imports'],
    rules: {
        'ivp-fsd-path-checker-plugin/ivp-fsd-path-checker': ['error', { alias: '@' }],
        'ivp-fsd-path-checker-plugin/ivp-fsd-public-api-imports': [
            'error',
            {
                alias: '@',
                testFilesPatterns: ['**/*.test.*', '**/*.story.*', '**/StoreDecorator.tsx'],
            },
        ],
        'ivp-fsd-path-checker-plugin/ivp-fsd-layer-imports': [
            'error',
            {
                alias: '@',
                ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
            },
        ],
        'unused-imports/no-unused-imports': 'error',
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal'],
                pathGroups: [
                    {
                        pattern: '@/**',
                        group: 'external',
                        position: 'after',
                    },
                    {
                        pattern: './**.module.*',
                        group: 'internal',
                        position: 'after',
                    },
                ],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
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
            'warn',
            {
                namedComponents: ['function-expression', 'arrow-function', 'function-declaration'],
                unnamedComponents: ['function-expression', 'arrow-function'],
            },
        ], // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
        'max-len': ['error', { ignoreComments: true, code: 125, ignoreStrings: true }], // https://eslint.org/docs/latest/rules/max-len | https://stackoverflow.com/questions/61631356/react-typescript-eslint-max-length-autofix-does-not-work
        'react-hooks/rules-of-hooks': 'error', // Проверяем правила хуков
        'react-hooks/exhaustive-deps': 'error', // Проверяем зависимости эффекта
        'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
        'no-unused-vars': 'warn', // no user variabels
        'react/jsx-props-no-spreading': 'warn',
        'react/destructuring-assignment': 'warn',
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
                ignoreAttribute: [
                    'as',
                    'refName',
                    'role',
                    'to',
                    'data-testid',
                    'target',
                    'justify',
                    'align',
                    'direction',
                    'gap',
                    'border',
                ],
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
                // 'import/no-extraneous-dependencies': [
                //     'error',
                //     { devDependencies: true, optionalDependencies: true, peerDependencies: true },
                // ],
                'import/no-extraneous-dependencies': [
                    'error',
                    {
                        devDependencies: [
                            '{test,stories}.{ts,tsx}', // repos with a single test file
                            '{test,stories}.{ts,tsx}', // repos with a single test file
                            'test-*.{ts,stories,tsx}', // repos with multiple top-level test files
                            '**/*{.,_}{test,spec,stories}.{ts,tsx}', // tests where the extension or filename suffix denotes that it is a test
                            '**/jest.config.ts', // jest config
                            '**/jest.setup.ts', // jest setup
                        ],
                        optionalDependencies: false,
                    },
                ],
                'max-len': 'off',
            },
        },
    ],
}
