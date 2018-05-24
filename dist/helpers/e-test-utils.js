'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.eMount = eMount
exports.eShallow = eShallow
exports.extendWrapper = extendWrapper

var _testUtils = require('@vue/test-utils')

function eMount (component, options) {
  return extendWrapper((0, _testUtils.mount)(component, options))
}

function eShallow (component, options) {
  return extendWrapper((0, _testUtils.shallow)(component, options))
}

function extendWrapper (wrapper) {
  wrapper.getInput = function (name) {
    return wrapper.find('input[name="' + name + '"]')
  }

  wrapper.setInputValue = function (name, value) {
    var input = wrapper.getInput(name)
    input.element.value = value
    input.trigger('input')
  }

  return wrapper
}
