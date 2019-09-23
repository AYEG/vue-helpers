import { VueConstructor } from 'vue'

export interface IUser {
  // eslint-disable-next-line camelcase
  first_name: string
  preposition: string
  surname: string
}
// tslint:disable-next-line:no-any
const isUser = (variableToCheck: any): variableToCheck is IUser =>
  typeof (variableToCheck as IUser).first_name === 'string' &&
  typeof (variableToCheck as IUser).preposition === 'string' &&
  typeof (variableToCheck as IUser).surname === 'string'

export default ({ Vue }: { Vue: VueConstructor }): void => {
  Vue.filter('fullName', (user: object | IUser): string => {
    if (!isUser(user)) return 'invalid user object'
    else {
      return (user as IUser).first_name + ' ' +
        ((user as IUser).preposition).trim() + ' ' + (user as IUser).surname
    }
  })
}
