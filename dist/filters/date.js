'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})

exports.default = function (_ref) {
  var Vue = _ref.Vue

  Vue.filter('date', function (timestamp) {
    if (typeof timestamp !== 'string') {
      return 'invalid date'
    }
    if (timestamp === '') {
      return ''
    }
    var date = timestamp.split('T')[0]
    var dateParts = date.split('-')

    if (dateParts.length !== 3) {
      return 'invalid date'
    }

    return dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0]
  })
}
