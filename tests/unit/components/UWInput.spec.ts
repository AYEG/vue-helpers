import { eMount } from '@laura-wert/vue-test-helpers'
import { expect } from 'chai'
import VeeValidate, { Validator } from 'vee-validate'
import UWInput from '../../../src/components/UWInput.vue'
import createTestApp from '../../helpers/create-test-app'

const localVue = createTestApp()
localVue.use(VeeValidate)
let validator: Validator

describe('UWInput.vue', () => {
  beforeEach(() => {
    validator = new VeeValidate.Validator()
  })

  it('displays props in input and is QInput by default', () => {
    const wrapper = eMount(UWInput, {
      sync: false,
      propsData: {
        input: '',
        name: 'awesome-input',
        value: 'current value of input',
        label: 'awesome test label',
        count: 500,
        readonly: true,
      },
      provide: {
        $validator: validator,
        parentValidator: validator,
      },
      localVue,
    })

    expect(wrapper.getTextFromInput('awesome-input')).to.equal('current value of input')

    expect(wrapper.find({ name: 'QField' }).props())
      .to.contain({ count: 500, label: 'awesome test label' })

    expect(wrapper.find({ name: 'QInput' }).props())
      .to.contain({ readonly: true, value: 'current value of input' })

    expect(wrapper.find('[name="awesome-input"]').classes('q-input')).to.be.true
  })

  it('by supplying input prop the component will render different QElements', () => {
    const wrapper = eMount(UWInput, {
      sync: false,
      propsData: {
        name: 'awesome-input',
        value: '',
        label: '',
        input: 'QSelect',
        options: [
          {
            label: 'test',
            value: 'much data',
          },
        ],
      },
      provide: {
        $validator: validator,
        parentValidator: validator,
      },
      localVue,
    })

    expect(wrapper.find('[name="awesome-input"]').classes('q-input')).to.be.false
    expect(wrapper.find('[name="awesome-input"]').classes('q-select')).to.be.true
  })
})
