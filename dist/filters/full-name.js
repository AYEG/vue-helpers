'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})

exports.default = function (_ref) {
  var Vue = _ref.Vue

  Vue.filter('fullName', function (user) {
    return (user.first_name + ' ' + user.preposition).trim() + ' ' + user.surname
  })
}
