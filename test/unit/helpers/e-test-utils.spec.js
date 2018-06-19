import TestTextForm from './forms/TestTextForm'
import TestIntForm from './forms/TestIntForm'
import TestOptionForm from './forms/TestOptionForm'
import TestChipsForm from './forms/TestChipsForm'
import TestMultiOptionsForm from './forms/TestMultiOptionsForm'
import TestForm from './forms/TestForm'
import { eMount } from 'src/helpers/e-test-utils'
import { createTestApp } from 'src/helpers/create-test-app'

const localVue = createTestApp({plugins: []})

let createTestFormInWrapper = (form, propsData) => {
  return eMount(
    form,
    {
      localVue,
      propsData,
    }
  )
}

describe('e-test-utils.js', () => {
  it('Test a text input field', () => {
    const wrapper = createTestFormInWrapper(TestTextForm, {testText: 'Hello world'})
    wrapper.validateForm(expect, {texts: {testText: 'Hello world'}})
  })

  it('Test an int input field', () => {
    const wrapper = createTestFormInWrapper(TestIntForm, {testInt: 13})
    wrapper.validateForm(expect, {ints: {testInt: 13}})
  })

  it('Test an option input field', () => {
    const wrapper = createTestFormInWrapper(TestOptionForm, {testOption: '2'})
    wrapper.validateForm(expect, {options: {testOption: 'b'}})
  })

  it('Test a chips input field', () => {
    const wrapper = createTestFormInWrapper(TestChipsForm, {testChips: ['a', 'b']})
    wrapper.validateForm(expect, {qChipLengths: {testChips: 2}})
  })

  it('Test multi options input field', () => {
    const wrapper = createTestFormInWrapper(TestMultiOptionsForm, {testMultiOption: ['1', '3']})
    wrapper.validateForm(expect, {multiOptions: {testMultiOption: ['a', 'c']}})
  })

  it('Test all input types', () => {
    const wrapper = createTestFormInWrapper(
      TestForm,
      {
        testText: 'Hello world',
        testInt: 13,
        testOption: '5',
        testChips: ['a', 'b'],
        testMultiOption: ['1', '3'],
      }
    )
    wrapper.validateForm(
      expect,
      {
        texts: {
          testText: 'Hello world',
        },
        ints: {
          testInt: 13,
        },
        options: {
          testOption: 'e',
        },
        qChipLengths: {
          testChips: 2,
        },
        multiOptions: {
          testMultiOption: ['a', 'c'],
        },
      }
    )
  })
})
