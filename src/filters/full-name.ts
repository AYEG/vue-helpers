import { VueConstructor } from 'vue'

interface IUser {
  // eslint-disable-next-line camelcase
  first_name: string
  preposition: string
  surname: string
}
export default ({ Vue }: { Vue: VueConstructor }): void => {
  Vue.filter('fullName', (user: IUser): string => {
    return (user.first_name + ' ' + user.preposition).trim() + ' ' + user.surname
  })
}
