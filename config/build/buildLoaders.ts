import webpack from 'webpack'
import { buildBabelLoader } from './loaders/buildBabelLoader'
import { buildCssLoader } from './loaders/buildCssLoader'
import { BuildOptions } from './types/config'

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options
    const cssLoader = buildCssLoader(isDev)

    // Если не используем тайпскрип - нужен babel-loader
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    // webpack v5

    // const fontLoader = {
    //     test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    //     type: 'asset/resource',
    // }

    // const svgLoader: webpack.RuleSetRule = {
    //     test: /\.svg$/,
    //     type: 'asset/resource',
    //     generator: {
    //         filename: options.paths.assets.svg,
    //     },
    // }

    // const imgLoader: webpack.RuleSetRule = {
    //     test: /\.(png|jpg|jpeg|gif)$/i,
    //     type: 'asset/resource',
    // }

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    }

    const babelLoader = buildBabelLoader(options)

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    }

    const fontLoader = {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/',
                },
            },
        ],
    }

    return [fileLoader, svgLoader, babelLoader, typescriptLoader, cssLoader]
    // return [fileLoader, svgLoader, typescriptLoader, cssLoader, fontLoader]
}
