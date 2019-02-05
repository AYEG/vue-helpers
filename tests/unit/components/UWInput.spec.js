import { eMount } from '@laura-wert/vue-test-helpers'
import { expect } from 'chai'
import ContactForm from 'src/components/UWInput/ContactForm.vue'
import { ContactRoles } from 'tests/helpers/school-contacts'
import VeeValidate, { Validator } from 'vee-validate'
import createTestApp from '../../helpers/create-test-app'

const localVue = createTestApp()

// let validator: Validator
let validator = Validator

describe('ContactForm.vue', () => {
  beforeEach(() => {
    validator = new VeeValidate.Validator()
  })

  it('Emits event when input changes', async () => {
    const propsData = {
      value: {
        first_name: '',
        preposition: '',
        surname: '',
        email: '',
        phone_number: '',
        role: ContactRoles.CONTACT,
      },
    }

    const wrapper = eMount(ContactForm, {
      sync: false,
      propsData,
      provide: {
        $validator: validator,
        parentValidator: validator,
      },
      localVue,
    })

    propsData.value.first_name = 'value'

    wrapper.vm.contactPerson = propsData

    expect(wrapper.emitted('input')[0]).to.eql([{
      first_name: 'value',
      preposition: '',
      surname: '',
      email: '',
      phone_number: '',
      role: ContactRoles.CONTACT,
    }])
  })
})
