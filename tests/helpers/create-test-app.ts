import { createTestApp as createBaseTestApp } from '@laura-wert/vue-test-helpers'
import Vue from 'vue'

export default (): typeof Vue => createBaseTestApp()
