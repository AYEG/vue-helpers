const {VueLoaderPlugin} = require('vue-loader') // installed via npm
const path = require('path')

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'uw-vue-helpers',
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
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader',
        ],
      },
    ],
  },
  externals: {
    quasar: 'quasar',
    vue: 'vue',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      quasar: path.resolve(__dirname, '../node_modules/quasar-framework/'),
      src: path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
}
