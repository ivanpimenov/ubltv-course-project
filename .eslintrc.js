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
    plugins: ['react', '@typescript-eslint', 'i18next', 'react-hooks', 'ivp-fsd-path-checker-plugin'],
    rules: {
        'ivp-fsd-path-checker-plugin/ivp-fsd-path-checker': 'error',
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
        'max-len': ['error', { ignoreComments: true, code: 125 }], // https://eslint.org/docs/latest/rules/max-len | https://stackoverflow.com/questions/61631356/react-typescript-eslint-max-length-autofix-does-not-work
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
            devDependencies: [
                'test/**', // tape, common npm pattern
                'tests/**', // also common npm pattern
                'spec/**', // mocha, rspec-like pattern
                '**/__tests__/**', // jest pattern
                '**/__mocks__/**', // jest pattern
                'test.{js,jsx}', // repos with a single test file
                'test-*.{js,jsx}', // repos with multiple top-level test files
                '**/*{.,_}{test,spec}.{js,jsx}', // tests where the extension or filename suffix denotes that it is a test
                '**/jest.config.js', // jest config
                '**/jest.setup.js', // jest setup
                '**/vue.config.js', // vue-cli config
                '**/webpack.config.js', // webpack config
                '**/webpack.config.*.js', // webpack config
                '**/rollup.config.js', // rollup config
                '**/rollup.config.*.js', // rollup config
                '**/gulpfile.js', // gulp config
                '**/gulpfile.*.js', // gulp config
                '**/Gruntfile{,.js}', // grunt config
                '**/protractor.conf.js', // protractor config
                '**/protractor.conf.*.js', // protractor config
                '**/karma.conf.js', // karma config
                '**/.eslintrc.js', // eslint config
            ],
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
                            'test.{ts,tsx}', // repos with a single test file
                            'test-*.{ts,tsx}', // repos with multiple top-level test files
                            '**/*{.,_}{test,spec}.{ts,tsx}', // tests where the extension or filename suffix denotes that it is a test
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
