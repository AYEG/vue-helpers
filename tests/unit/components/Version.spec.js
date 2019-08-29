import { shallowMount } from '@vue/test-utils'
import Version from 'src/components/Version.ts'

let propsData = {}

describe('Version.vue', () => {
  beforeEach(() => {
    propsData = { version: 'dev' }
  })

  it('Shows version of the project', () => {
    const wrapper = shallowMount(Version, {
      propsData,
    })
    expect(wrapper.find('span').text()).to.equal('Versie: dev')
  })

  it('Show changed version', () => {
    propsData.version = 'test_string'

    const wrapper = shallowMount(Version, {
      propsData,
    })
    expect(wrapper.find('span').text()).to.equal('Versie: test_string')
  })
})
