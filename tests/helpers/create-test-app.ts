import { createLocalVue } from '@vue/test-utils'
import Quasar from 'quasar'
import Vue from 'vue'

Vue.use(Quasar, {})

export default (): typeof Vue => createLocalVue()
