<template>
  <component
    :is="inputComp"
    :name="name"
    v-bind="allAttrs"
    v-on="$listeners"
  />
</template>

<script lang=ts>
import { Validator } from 'vee-validate'
import { Component, Inject, Prop, Vue } from 'vue-property-decorator'

@Component
export default class UwInput extends Vue {
  @Prop({ default: 'QInput', type: String }) public input!: string
  @Prop({ required: true, type: String }) public name!: string
  @Inject('parentValidator') public parentValidator!: Validator

  get inputComp(): Vue {
    switch (this.input) {
      case 'QInput':
      default:
        return require('quasar/src/components/input/QInput').default
      case 'QSelect':
        return require('quasar/src/components/select/QSelect').default
    }
  }

  // tslint:disable-next-line: no-any
  get allAttrs(): Record<string, any> {
    return this.setDefaultAttrs(this.$attrs)
  }

  // tslint:disable-next-line: no-any
  private setDefaultAttrs(attrs: Record<string, any>): Record<string, any> {
    const attributes = [
      'error-message',
      'error',
      'label',
      'bottom-slots',
    ]
    attributes.forEach((attr: string) => {
      if (attrs[attr]) return
      switch (attr) {
        case 'error-message':
          attrs['error-message'] = this.parentValidator.errors.first(this.name)
          break
        case 'error':
          attrs.error = this.parentValidator.errors.has(this.name)
          break
        case 'label':
          // @ts-ignore $t exists if vue-i18n
          if (this.$t !== undefined) {
            // @ts-ignore $t exists if vue-i18n
            attrs.label = this.$t('attributes.' + this.name)
          } else {
            attrs.label = this.name
          }

          break
        case 'bottom-slots':
          attrs['bottom-slots'] = true
          break
      }
    })
    return attrs
  }
}
</script>
