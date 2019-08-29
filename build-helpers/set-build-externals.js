const externals = {
  '@laura-wert/vue-helpers': '@laura-wert/vue-helpers',
  '@vue/test-utils': '@vue/test-utils',
  'axios': 'axios',
  'quasar': 'quasar',
  'quasar/lang/nl': 'quasar/lang/nl',
  'quasar/src/vue-plugin.js': 'quasar/src/vue-plugin.js',
  'quasar/src/components/btn/QBtn': 'quasar/src/components/btn/QBtn',
  'quasar/src/components/checkbox/QCheckbox.js': 'quasar/src/components/checkbox/QCheckbox.js',
  'quasar/src/components/banner/QBanner': 'quasar/src/components/banner/QBanner',
  'quasar/src/components/icon/QIcon': 'quasar/src/components/icon/QIcon',
  'quasar/src/components/input/QInput.js': 'quasar/src/components/input/QInput.js',
  'quasar/src/components/select/QSelect.js': 'quasar/src/components/select/QSelect.js',
  'quasar/src/utils/scroll': 'quasar/src/utils/scroll',
  'quasar/src/vue-plugin': 'quasar/src/vue-plugin',
  'sanitizer': 'sanitizer',
  'tslib': 'tslib',
  'vee-validate': 'vee-validate',
  'vue': 'vue',
  'vuex': 'vuex',
  'vue-browser-acl': 'vue-browser-acl',
  'vue-class-component': 'vue-class-component',
  'vue-property-decorator': 'vue-property-decorator',
  'vuex-xhr-state': 'vuex-xhr-state',
}

exports.setBuildExternals = function(config) {
  if (config.mode === 'production') {
    config.externals = Object.assign(config.externals || {}, externals)
    delete config.devtool
  }
}
