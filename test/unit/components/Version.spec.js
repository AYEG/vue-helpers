import { shallow } from '@vue/test-utils'
import Version from 'src/components/Version'
import { createTestApp } from 'src/helpers/create-test-app'

let localVue = createTestApp()

let propsData = {}

describe('Version.vue', () => {
  beforeEach(() => {
    propsData = {version: 'dev'}
  })

  it('Shows version of the project', () => {
    const wrapper = shallow(Version, {
      propsData,
      localVue,
    })
    expect(wrapper.find('span').text()).toBe('Versie: dev')
  })

  it('Show changed version', () => {
    propsData.version = 'test_string'

    const wrapper = shallow(Version, {
      propsData,
      localVue,
    })
    expect(wrapper.find('span').text()).toBe('Versie: test_string')
  })
})
