const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  css: { extract: false },
  chainWebpack: config => {
    config.resolve.symlinks(false)
    config.plugin('fork-ts-checker').tap(options => {
      options[0].reportFiles = [
        'src/**/*.{ts,tsx,vue}',
        '!src/**/*.js.vue',
        'tests/**/*.{ts,tsx}',
      ]
      return options
    })
  },
  configureWebpack: config => {
    config.resolve.alias.quasar = path.resolve(__dirname, './node_modules/quasar-framework/dist/quasar.mat.esm.js')
    config.resolve.alias.src = path.resolve(__dirname, './src')
    config.resolve.alias.tests = path.resolve(__dirname, './tests')

    if (config.mode === 'production') {
      config.externals.quasar = 'quasar'
      config.externals['@vue/test-utils'] = '@vue/test-utils'
      config.externals['vue-class-component'] = 'vue-class-component'
      delete config.devtool
    }
  },
}
