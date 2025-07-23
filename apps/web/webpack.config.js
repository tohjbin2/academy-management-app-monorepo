/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = env => {
  // const { development, production } = env;

  // if (development) {
  //   dotenv.config({
  //     path: './.env.development',
  //   });
  // } else if (production) {
  //   dotenv.config({
  //     path: './.env.production',
  //   });
  // }

  dotenv.config({
    path: '.env',
  });

  console.log('env:', env);
  console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

  return {
    entry: './src/index.tsx',
    output: {
      filename: 'bundle.[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    devtool: 'source-map',
    devServer: {
      historyApiFallback: true,
      port: 3002,
      open: true,
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.js$|jsx$|ts$|tsx/,
          use: ['babel-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
    resolve: {
      fallback: {
        path: require.resolve('path-browserify'),
        os: require.resolve('os-browserify/browser'),
        // stream: require.resolve('stream-browserify'), // 추가
        // buffer: require.resolve('buffer/'), // 추가
        // process: require.resolve('process/browser'), // 추가
        // stream: require.resolve('stream-browserify'),
        // util: require.resolve('util/'),
        // buffer: require.resolve('buffer/'),
        // process: require.resolve('process/browser'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        // favicon: './public/data/navbar-logo.png', // MEMO: 파비콘
      }),
      new MiniCssExtractPlugin({
        filename: './[name].css',
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
    ],
  };
};
