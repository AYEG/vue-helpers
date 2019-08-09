const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { setBuildExternals } = require('./build-helpers')

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
    config.resolve.alias.src = path.resolve(__dirname, './src')
    config.resolve.alias.tests = path.resolve(__dirname, './tests')

    setBuildExternals(config)
  },
}
