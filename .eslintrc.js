module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:react/recommended', 'airbnb'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        'react/jsx-indent': [2, 4], // отступы
        'react/jsx-indent-props': [2, 4],
        indent: [2, 4],
        // 'linebreak-style': ['error', 'unix'], // перенос строки windows / unix
        'linebreak-style': 0,
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }], // Файлы в которых можно использовать jsx
        'react/function-component-definition': [
            2,
            {
                namedComponents: ['function-expression', 'arrow-function'],
                unnamedComponents: ['function-expression', 'arrow-function'],
            },
        ], // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
        'no-unused-vars': 'warn', // no user variabels
        'react/jsx-props-no-spreading': 'warn',
        'import/no-extraneous-dependencies': 'warn',
        'react/react-in-jsx-scope': 'off', // import react - from react v17 not needed
        'import/no-unresolved': 'off', // запрещает import требует requier
        'import/prefer-default-export': 'off', // default export
        'no-shadow': 'off', // https://eslint.org/docs/latest/rules/no-shadow
        'react/require-default-props': 'off', // нельзя использовать переменную без деволтного значения
        'import/extensions': 'off',
        'no-underscore-dangle': 'off',
        'max-len': 'off', // https://eslint.org/docs/latest/rules/max-len | https://stackoverflow.com/questions/61631356/react-typescript-eslint-max-length-autofix-does-not-work
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    globals: {
        __IS_DEV__: true,
    },
};
