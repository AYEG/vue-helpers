import { eMount } from '@laura-wert/vue-test-helpers'
import { createLocalVue, mount } from '@vue/test-utils'
import { expect } from 'chai'
import { Validator } from 'vee-validate'
import UWInput from '../../../src/components/UwInput.vue'
import FormHelper from '../../helpers/FormHelper.vue'

const localVue = createLocalVue()
let validator: Validator

describe('UWInput.vue', () => {
  beforeEach(() => {
    validator = new Validator()
  })

  it('displays props in input and is QInput by default', () => {
    const wrapper = eMount(UWInput, {
      sync: false,
      propsData: {
        name: 'awesome-input',
        value: 'current value of input',
        label: 'awesome test label',
        counter: true,
        readonly: true,
      },
      provide: {
        parentValidator: validator,
      },
      localVue,
    })

    expect(wrapper.getTextFromInput('awesome-input')).to.equal('current value of input')

    expect(wrapper.find('.q-field__label').text())
      .to.equal('awesome test label')

    expect(wrapper.find({ name: 'QInput' }).props())
      .to.contain({ label: 'awesome test label', counter: true, readonly: true, value: 'current value of input' })

    expect(wrapper.classes('q-input')).to.be.true
  })

  it('will render different QElements by supplying input prop', () => {
    const wrapper = mount(UWInput, {
      sync: false,
      propsData: {
        input: 'QSelect',
        name: 'awesome-input',
        value: '',
        label: '',
        options: [
          {
            label: 'test',
            value: 'much data',
          },
        ],
      },
      provide: {
        parentValidator: validator,
      },
      localVue,
    })

    expect(wrapper.classes('q-input')).to.be.false
    expect(wrapper.classes('q-select')).to.be.true
  })

  it('translates the name as label if vue-i18n translate is present', () => {
    const wrapper = mount(UWInput, {
      sync: false,
      propsData: {
        name: 'input-name',
      },
      provide: {
        parentValidator: validator,
      },
      methods: {
        $t: (key: string): string => 'translated ' + key,
      },
      localVue,
    })

    expect(wrapper.find('.q-field__label').text())
      .to.equal('translated attributes.input-name')
  })

  it('uses the name as label if vue-i18n translate is not present', () => {
    const wrapper = mount(UWInput, {
      sync: false,
      propsData: {
        name: 'input-name',
      },
      provide: {
        parentValidator: validator,
      },
      localVue,
    })

    expect(wrapper.find('.q-field__label').text())
      .to.equal('input-name')
  })

  it('shows the validation error', async () => {
    const wrapper = eMount(FormHelper, {
      localVue,
    })

    wrapper.setInputValue('input1', '')
    await wrapper.vm.$nextTick()

    await wrapper.vm.$validator.validateAll()

    expect(wrapper.getValidationError('input1')).to.equal('The input1 value is not valid.')
  })
})
