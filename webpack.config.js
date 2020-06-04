const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const webpack = require('webpack')
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        main: ['@babel/polyfill', './src/index.js'],
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
    module: {
        rules: [
            {
                test: /\.svg$/,
                include: path.resolve(__dirname, 'src/assets/images/icons'),
                loader: 'svg-sprite-loader',
                options: {
                    extract: true,
                    spriteFilename: 'images/icons.svg',
                    runtimeCompat: true
                }
            },
            {
                test: /\.(png|jpe?g|svg)$/i,
                exclude: path.resolve(__dirname, 'src/assets/images/icons'),
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images'
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
                    outputPath: 'fonts'
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/styles.[hash].css',
        }),
        new HtmlWebpackPlugin({
            template: './src/index.pug',
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new SpriteLoaderPlugin({
            plainSprite: true
        }),
        new webpack.DefinePlugin({
            NODE_ENV: process.env.NODE_ENV
        })
    ]
}