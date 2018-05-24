import { createLocalVue } from '@vue/test-utils'
import dateFilter from 'src/filters/date'

const localVue = createLocalVue()
dateFilter({Vue: localVue})
const date = localVue.options.filters.date

describe('date.js', () => {
  it('returns a formatted date when given an ISO 8601 timestamp', () => {
    expect(date('2018-03-18T20:14:28+00:00')).toBe('18-03-2018')
    expect(date('2016-04-21T20:14:28Z')).toBe('21-04-2016')
    expect(date('2017-10-21')).toBe('21-10-2017')
  })

  it('returns invalid date if the input is not a string', () => {
    expect(date(204289304)).toBe('invalid date')
    expect(date([])).toBe('invalid date')
  })

  it('returns invalid date if the input does not contain 2 dashes', () => {
    expect(date('2017/10/21')).toBe('invalid date')
    expect(date('2017-10/21')).toBe('invalid date')
    expect(date('2017-10-21-12')).toBe('invalid date')
    expect(date('2017-10-21')).toBe('21-10-2017')
  })
})
