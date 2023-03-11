import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { BuildOptions } from './types/config'

export function buildPlugins({
    paths,
    isDev,
    analyze,
    apiUrl 
}: BuildOptions): webpack.WebpackPluginInstance[] {
    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
        }),
    ]
    if (isDev) {
        plugins.push(new ReactRefreshWebpackPlugin())
        plugins.push(
            new webpack.HotModuleReplacementPlugin(
                // Hide the react error screen
                { overlay: false }
            )
        )
    }
    if (analyze) {
        plugins.push(new BundleAnalyzerPlugin({ openAnalyzer: true }))
    }
    return plugins
    // return plugins.filter(Boolean)
}
