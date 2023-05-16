import path from 'path'

import webpack, { DefinePlugin } from 'webpack'

import { buildCssLoader } from '../build/loaders/buildCssLoader'
import { BuildPaths } from '../build/types/config'

export default ({ config }: { config: webpack.Configuration }) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
        locales: '',
        buildLocales: ''
    }

    if (config.resolve?.modules) config.resolve.modules.push(paths.src)
    config!.resolve!.alias = {
        ...config!.resolve!.alias,
        '@': paths.src,
    }
    if (config.resolve?.extensions) config.resolve.extensions.push('.ts', '.tsx')


    if (config.module?.rules) {
        // eslint-disable-next-line no-param-reassign
        config.module.rules = config.module.rules.map((rule: webpack.RuleSetRule | '...') => {
            if (rule !== '...' && /svg/.test(rule.test as string)) {
                return { ...rule, exclude: /\.svg$/i }
            }

            return rule
        })
    }

    config.module?.rules?.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    })
    
    // config.module?.rules?.push({
    //     test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    //     use: [
    //         {
    //             loader: 'file-loader',
    //         },
    //     ],
    // })

    config.module?.rules?.push(buildCssLoader(true))
    config.plugins?.push(
        new DefinePlugin({
            __IS_DEV__: JSON.stringify(true),
            __API__: JSON.stringify('https://testapi.com'),
            __PROJECT__: JSON.stringify('storybook'),
        })
    )

    return config
}
