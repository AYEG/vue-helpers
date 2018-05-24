'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.findRouterLinkStub = findRouterLinkStub
exports.findRouterLinkItemToName = findRouterLinkItemToName
function findRouterLinkStub (wrapper, name) {
  var find = wrapper.findAll({ name: 'RouterLinkStub' }).filter(function (w) {
    return w.isVisible() && w.element.attributes !== undefined && w.attributes().name === name
  })
  if (find.length === 0) {
    return undefined
  }
  if (find.length > 1) {
    throw new Error('Found multiple RouterLinkStubs with same name')
  }
  return find.at(0)
}

function findRouterLinkItemToName (wrapper, name) {
  var item = findRouterLinkStub(wrapper, name)
  if (!item) {
    return undefined
  }
  return item.props().to.name
}
