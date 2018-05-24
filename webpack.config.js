const merge = require('webpack-merge')
const path = require('path')

var config = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '/dist/'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, './src')],
      },
    ],
  },
  externals: {
    quasar: 'quasar',
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      quasar: path.resolve(__dirname, '../node_modules/quasar-framework/'),
      src: path.resolve(__dirname, './src'),
    },
  },
}

module.exports = [
  merge(config, {
    entry: path.resolve(__dirname, '/src/index.js'),
    output: {
      filename: 'index.js',
      libraryTarget: 'umd',
      library: 'uw-vue-helpers',
    },
  }),
]
