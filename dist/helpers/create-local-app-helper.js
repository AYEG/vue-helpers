'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.createAppVue = createAppVue

var _testUtils = require('@vue/test-utils')

var _fullName = require('../filters/full-name')

var _fullName2 = _interopRequireDefault(_fullName)

var _date = require('../filters/date')

var _date2 = _interopRequireDefault(_date)

var _veeValidate = require('../../../src/plugins/vee-validate')

var _veeValidate2 = _interopRequireDefault(_veeValidate)

var _quasar = require('quasar')

var _quasar2 = _interopRequireDefault(_quasar)

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

function createAppVue () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}

  var app = options.app || null
  var router = options.router || null
  var store = options.store || null

  var localVue = (0, _testUtils.createLocalVue)()
  localVue.use(_quasar2.default)

  var plugins = []
  plugins.push(_fullName2.default)
  plugins.push(_date2.default)
  plugins.push(_veeValidate2.default)

  localVue.component('transition', _testUtils.TransitionStub)

  plugins.forEach(function (plugin) {
    return plugin({ app: app, router: router, store: store, Vue: localVue })
  })
  return localVue
}
