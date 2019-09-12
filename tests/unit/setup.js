import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import Vue from 'vue'
import Quasar from 'quasar'
import VeeValidate from 'vee-validate'

Vue.use(Quasar, {})
Vue.use(VeeValidate, {
  locale: 'nl',
})

global.expect = expect
chai.use(sinonChai)

global.requestAnimationFrame = cb => cb()
