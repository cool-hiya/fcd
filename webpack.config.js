const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const GhPagesWebpackPlugin = require('gh-pages-webpack-plugin');
const webpack = require('webpack')
const autoprefixer = require('autoprefixer');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: ['@babel/polyfill', './index.js'],
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 4200,
        writeToDisk: true,
        open: true
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@helpers': path.resolve(__dirname, 'src/assets/utils/helpers.js')
        }
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                include: /icons/,
                loader: 'svg-sprite-loader',
                options: {
                    extract: true,
                    spriteFilename: 'icons.svg',
                    outputPath: './images/',
                    runtimeCompat: true
                }
            },
            {
                test: /\.(png|jpe?g|svg)$/i,
                exclude: /icons/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './images'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 85,
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: 90,
                                speed: 4,
                            }
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            },
            {
                test: /\.pug$/,
                use: [
                    "html-loader",
                    "pug-html-loader"
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {publicPath: '../'}
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer()
                            ],
                        }
                    },
                    'sass-loader'
                ],
            },
            {
                test: /\.(woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    outputPath: './fonts'
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/styles.[hash].css',
        }),
        new HtmlWebpackPlugin({
            template: './index.pug',
            filename: 'index.html',
        }),
        new HtmlWebpackPlugin({
            template: './pages/ui-kit/ui-kit.pug',
            filename: 'ui-kit.html',
        }),
        new HtmlWebpackPlugin({
            template: './pages/sign-in/sign-in.pug',
            filename: 'sign-in.html',
        }),
        new HtmlWebpackPlugin({
            template: './pages/registration/registration.pug',
            filename: 'registration.html',
        }),
        new CleanWebpackPlugin(),
        new SpriteLoaderPlugin({
            plainSprite: true
        }),
        new GhPagesWebpackPlugin({
            path: path.resolve(__dirname, 'dist')
        }),
        new webpack.DefinePlugin({
            NODE_ENV: process.env.NODE_ENV
        })
    ]
}