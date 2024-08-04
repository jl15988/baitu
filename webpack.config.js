import path from 'path'
import { fileURLToPath } from 'url'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import {VueLoaderPlugin} from "vue-loader";

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const config = (env, { mode = 'production' }) => {
    const isProd = mode === 'production'

    return {
        mode: mode,
        devtool: 'cheap-module-source-map',
        entry: {
            main: './example/main.ts',
        },
        output: {
            path: path.resolve(__dirname, './example/dist'),
            filename: isProd ? '[name].[contenthash].js' : '[name].js',
        },
        resolve: {
            // 自动补全后缀
            extensions: [".vue", '.ts', '.js'],
            mainFields: ['module', 'main'],
            alias: {
                // "@": path.resolve(__dirname, "src"),
                vue$: isProd
                    ? 'vue/dist/vue.esm-browser.prod.js'
                    : 'vue/dist/vue.esm-browser.js'
            },
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                },
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    options: {
                        // 需要对单文件做特殊处理
                        configFile: path.resolve(process.cwd(), "tsconfig.json"),
                        appendTsSuffixTo: [/\.vue$/],
                    }
                },
                {
                    test: /\.css$/, //解析css
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.scss$/,
                    use: ["style-loader", "css-loader", "sass-loader"],
                },
                {
                    test: /\.svg$/,
                    loader: 'file-loader',
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'example/index.html',
                minify: {
                    minifyCSS: true,
                    collapseWhitespace: true,
                    keepClosingSlash: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    useShortDoctype: true,
                },
            }),
            // 解析vue
            new VueLoaderPlugin(),
        ],
        devServer: {
            hot: true,
            client: {
                overlay: true,
                progress: true,
                logging: 'none', // 禁用控制台的日志输出
            },
            historyApiFallback: true,
        },
    }
}

export default config
