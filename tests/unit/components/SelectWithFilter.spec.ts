import { eMount } from '@laura-wert/vue-test-helpers'
import { createLocalVue, createWrapper, Wrapper } from '@vue/test-utils'
import { expect } from 'chai'
import { QSelect } from 'quasar/dist/types/index'
import SelectWithFilter from '../../../src/components/SelectWithFilter.vue'
const localVue = createLocalVue()

interface IQSelect extends QSelect {
  virtualScrollSliceRange: object
}
describe('SelectWithFilter.vue', () => {
  const testData = [{
    label: 'orange',
    value: 'orange',
  },
  {
    label: 'red',
    value: 'red',
  },
  {
    label: 'green',
    value: 'green',
  }]

  it('filters list of qselect options based on input', async () => {
    document.body.innerHTML = ''

    const wrapper = eMount(SelectWithFilter, {
      sync: false,
      propsData: {
        options: testData,
        value: '',
      },
      localVue,
    })

    const qSelect: Wrapper<IQSelect> = wrapper.find({ name: 'QSelect' })

    qSelect.vm.virtualScrollSliceRange = { from: 0, to: qSelect.vm.options!.length }
    wrapper.find('.q-field__control').element.dispatchEvent(new CustomEvent('focusin'))
    qSelect.vm.showPopup()
    await wrapper.vm.$nextTick()

    qSelect.vm.filter('gr')
    await wrapper.vm.$nextTick()
    // TODO: alternatief voor zelf functies aanroepen: sinon fake timers gebruiken.
    // global meegeven aan fake timer instance
    // dan input gebruiken en clock tick next

    // @ts-ignore
    const qMenu = createWrapper(window.document.body.getElementsByClassName('q-menu')[0].__vue__)

    expect(qMenu.html()).does.not.contain('red', 'orange')
    expect(qMenu.html()).does.contain('green')
  })
})
