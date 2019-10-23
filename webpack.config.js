/*
eslint-disable
linebreak-style,
id-length,
no-process-env,
max-len,
no-sync,
no-magic-numbers,
global-require
*/

const { join } = require('path');
const childProcess = require('child_process');
const webpack = require('webpack');

const host = childProcess.execSync('ipconfig', { encoding: 'utf8' }).split('\r\n').slice(-4, -3)[0].split(':')[1].trim();

const plugins = {
  HtmlWebpackPlugin: require('html-webpack-plugin'),
  CleanWebpackPlugin: require('clean-webpack-plugin'),
  BrowserSyncPlugin: require('browser-sync-webpack-plugin'),
  CopyWebpackPlugin: require('copy-webpack-plugin'),
  MiniCssExtractPlugin: require('mini-css-extract-plugin'),
  OptimizeCSSAssetsPlugin: require('optimize-css-assets-webpack-plugin'),
  ExtendedDefinePlugin: require('extended-define-webpack-plugin'),
  PostcssUrlMapper: require('postcss-url-mapper'),
  ManifestPlugin: require('webpack-manifest-plugin'),
  LicenseInfoWebpackPlugin: require('license-info-webpack-plugin').default,
  UglifyJsPlugin: require('uglifyjs-webpack-plugin'),
  ExtendedDefineWebpackPlugin: require('extended-define-webpack-plugin'),
  BannerPlugin: webpack.BannerPlugin,
};

const commonDefs = {
  DEPS: `${ join(__dirname, 'node_modules') }/`,
};

const eslintConfig = join(__dirname, '.eslintrc.js');

const projectParams = {
  'external-data-loader': {
    entry: '../external-data-loader/index.js',
    dirname: join(__dirname, '../external-data-loader'),
  },

  'xgk-js-webpack-cpp-loader': {
    entry: '../xgk-js-webpack-cpp-loader/index.js',
    dirname: join(__dirname, '../xgk-js-webpack-cpp-loader'),
  },

  'js-web-test': {
    entry: '../js-web-test/src/index.js',
    dirname: join(__dirname, '../js-web-test'),
  },
};

module.exports = require(`../${ process.env.PROJECT }/webpack.config`)(
  projectParams[process.env.PROJECT],
  plugins,
  commonDefs,
  eslintConfig,
  process.env,
  host,
);
