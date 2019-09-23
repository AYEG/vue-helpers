import { VueConstructor } from 'vue'

export default ({ Vue }: { Vue: VueConstructor }): void => {
  Vue.filter('date', (timestamp: string): string => {
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
