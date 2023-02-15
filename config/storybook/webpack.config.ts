import path from 'path'
import webpack from 'webpack'
import { buildCssLoader } from '../build/loaders/buildCssLoader'
import { BuildPaths } from '../build/types/config'

export default ({ config }: { config: webpack.Configuration }) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
    }

    if (config.resolve?.modules) config.resolve.modules.push(paths.src)
    if (config.resolve?.extensions)
        config.resolve.extensions.push('.ts', '.tsx')

    if (config.module?.rules) {
        // eslint-disable-next-line no-param-reassign
        config.module.rules = config.module.rules.map(
            (rule: webpack.RuleSetRule | '...') => {
                if (rule !== '...' && /svg/.test(rule.test as string)) {
                    return { ...rule, exclude: /\.svg$/i }
                }

                return rule
            }
        )
    }

    config.module?.rules?.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    })
    config.module?.rules?.push(buildCssLoader(true))

    return config
}
