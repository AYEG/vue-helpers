import { mount, shallow } from '@vue/test-utils'

export function eMount (component, options) {
  return extendWrapper(mount(component, options))
}

export function eShallow (component, options) {
  return extendWrapper(shallow(component, options))
}

export function extendWrapper (wrapper) {
  wrapper.getInput = name => wrapper.find('input[name="' + name + '"]')

  wrapper.setInputValue = (name, value) => {
    const input = wrapper.getInput(name)
    input.element.value = value
    input.trigger('input')
  }

  return wrapper
}
