import { createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'
import dateFilter from '../../../src/filters/date'

const localVue = createLocalVue()
dateFilter({ Vue: localVue })
// @ts-ignore
const date = localVue.options.filters.date

describe('date.ts', () => {
  it('Returns a formatted date when given an ISO 8601 timestamp', () => {
    expect(date('2018-03-18T20:14:28+00:00')).to.equal('18-03-2018')
    expect(date('2016-04-21T20:14:28Z')).to.equal('21-04-2016')
    expect(date('2017-10-21')).to.equal('21-10-2017')
  })

  it('Returns invalid date if the input is not a string', () => {
    expect(date(204289304)).to.equal('invalid date')
    expect(date([])).to.equal('invalid date')
  })

  it('Returns invalid date if the input does not contain 2 dashes', () => {
    expect(date('2017/10/21')).to.equal('invalid date')
    expect(date('2017-10/21')).to.equal('invalid date')
    expect(date('2017-10-21-12')).to.equal('invalid date')
    expect(date('2017-10-21')).to.equal('21-10-2017')
  })
})
