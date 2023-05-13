import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CircularDependencyPlugin from 'circular-dependency-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

import { BuildOptions } from './types/config'

export function buildPlugins({
    paths,
    isDev,
    analyze,
    apiUrl,
    project,
}: BuildOptions): webpack.WebpackPluginInstance[] {
    const isProd = !isDev
    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project),
        }),
    ]
    // Dev mode
    if (isDev) {
        plugins.push(new ReactRefreshWebpackPlugin())
        plugins.push(
            new webpack.HotModuleReplacementPlugin(
                // Hide the react error screen
                { overlay: false }
            )
        )
        plugins.push(
            new CircularDependencyPlugin({
                // exclude detection of files based on a RegExp
                exclude: /node_modules/,
                // include specific files based on a RegExp
                // include: /dir/,
                // add errors to webpack instead of warnings
                failOnError: true,
                // allow import cycles that include an asyncronous import,
                // e.g. via import(/* webpackMode: "weak" */ './file.js')
                // allowAsyncCycles: false,
                // set the current working directory for displaying module paths
                // cwd: process.cwd(),
            })
        )
        plugins.push(
            new ForkTsCheckerWebpackPlugin({
                typescript: {
                    diagnosticOptions: {
                        semantic: true,
                        syntactic: true,
                    },
                    mode: 'write-references',
                },
            })
        )
    }
    // Prod mode
    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            })
        )
        plugins.push(
            new CopyPlugin({
                patterns: [{ from: paths.locales, to: paths.buildLocales }],
            })
        )
    }

    if (analyze) {
        plugins.push(new BundleAnalyzerPlugin({ openAnalyzer: true }))
    }
    return plugins
    // return plugins.filter(Boolean)
}
