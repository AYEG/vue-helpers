import { eMount } from '@laura-wert/vue-test-helpers'
import { expect } from 'chai'
import { UWInput } from 'src'
import VeeValidate, { Validator } from 'vee-validate'
import createTestApp from '../../helpers/create-test-app'

const localVue = createTestApp()
localVue.use(VeeValidate)
let validator: Validator

describe('UWInput.vue', () => {
  beforeEach(() => {
    validator = new VeeValidate.Validator()
  })

  it('displays props in input and is QInput by default', async () => {
    const wrapper = eMount(UWInput, {
      sync: false,
      propsData: {
        input: '',
        name: 'awesome-input',
        value: 'current value of input',
        label: 'awesome test label',
      },
      provide: {
        $validator: validator,
        parentValidator: validator,
      },
      localVue,
    })

    expect(wrapper.getTextFromInput('awesome-input')).to.equal('current value of input')
    expect(wrapper.find('[data-name="awesome-input-field"]').text()).to.equal('awesome test label|')
    expect(wrapper.find('[name="awesome-input"]').classes('q-input')).to.be.true
  })

  it('by supplying input prop the component will render different QElements', async () => {
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
      localVue,
      provide: {
        $validator: validator,
        parentValidator: validator,
      },
    })

    expect(wrapper.find('[name="awesome-input"]').classes('q-input')).to.be.false
    expect(wrapper.find('[name="awesome-input"]').classes('q-select')).to.be.true
  })
})
