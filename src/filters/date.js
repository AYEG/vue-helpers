export default ({ Vue }) => {
  Vue.filter('date', function(timestamp) {
    if (typeof timestamp !== 'string') {
      return 'invalid date'
    }

    if (timestamp === '') {
      return ''
    }

    const date = timestamp.split('T')[0]
    const dateParts = date.split('-')

    if (dateParts.length !== 3) {
      return 'invalid date'
    }

    return dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0]
  })
}
