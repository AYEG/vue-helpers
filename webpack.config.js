const merge = require('webpack-merge')
const path = require('path')

var config = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist/'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, './src')],
      },
      {
        test: /\.vue$/,
        include: [path.resolve(__dirname, './src')],
        loader: 'vue-loader',
      },
    ],
  },
  externals: {
    quasar: 'quasar',
    '@vue/test-utils': '@vue/test-utils',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      quasar: path.resolve(__dirname, '../node_modules/quasar-framework/'),
      src: path.resolve(__dirname, './src'),
    },
  },
}
console.log(__dirname)
module.exports = [
  merge(config, {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
      filename: 'index.js',
      libraryTarget: 'umd',
      library: 'uw-vue-helpers',
    },
  }),
]
