import { createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'
import fullNameFilter, { IUser } from '../../../src/filters/full-name'

const localVue = createLocalVue()
fullNameFilter({ Vue: localVue })
// @ts-ignore
const fullName = localVue.options.filters.fullName

const completeUserDetails: IUser = {
  first_name: 'jip',
  preposition: 'de',
  surname: 'scripter',
}
const partialUserDetails: IUser = {
  first_name: '',
  preposition: '',
  surname: 'scripter',
}
const emptyUserDetails: IUser = {
  first_name: '',
  preposition: '',
  surname: '',
}
const invalidUser: object = {
  nickname: 'j',
}

describe('full-name.ts', () => {
  it('Returns formatted name details when given user details', () => {
    expect(fullName(completeUserDetails)).to.equal('jip de scripter')
    expect(fullName(partialUserDetails)).to.equal('  scripter')
    expect(fullName(emptyUserDetails)).to.equal('  ')
  })

  it('Returns inavlid user if the input is not of type user', () => {
    expect(fullName(invalidUser)).to.equal('invalid user object')
  })
})
