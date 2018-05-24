import { createLocalVue, TransitionStub } from '@vue/test-utils'
import fullNameFilter from '../../src/plugins/filters/full-name'
import dateFilter from '../../src/plugins/filters/date'
import veeValidatePlugin from '../../../src/plugins/vee-validate'
import quasar from 'quasar'

export function createAppVue (options = {}) {
  const app = options.app || null
  const router = options.router || null
  const store = options.store || null

  const localVue = createLocalVue()
  localVue.use(quasar)

  const plugins = []
  plugins.push(fullNameFilter)
  plugins.push(dateFilter)
  plugins.push(veeValidatePlugin)

  localVue.component('transition', TransitionStub)

  plugins.forEach(plugin => plugin({app, router, store, Vue: localVue}))
  return localVue
}
