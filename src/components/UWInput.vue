<template>
  <q-field
    :error-label="errors.first(scope + name)"
    :error="errors.has(scope + name)"
    :label="label"
    :data-name="name + '-field'"
  >
    <component
      :is="inputComp"
      v-model="localValue"
      :name="name"
      v-bind="$attrs"
    />
  </q-field>
</template>
<script lang=ts>
import { QField, QInput, QSelect } from 'quasar'
import { Validator } from 'vee-validate'
import Vue from 'vue'
import { Component, Inject, Prop } from 'vue-property-decorator'

@Component({ components: { QField, QInput, QSelect } })
export default class UWInput extends Vue {
  @Inject('parentValidator') public $validator!: Validator
  @Prop() public input!: string
  @Prop({ required: true }) public value!: string
  @Prop({ required: true }) public name!: string
  @Prop({ required: false, default: '' }) public validatorScope!: string
  @Prop({ required: false, default: '' }) public label!: string

  get scope(): string {
    return this.validatorScope !== '' ? this.validatorScope + '.' : ''
  }

  get inputComp(): Vue {
    switch (this.input) {
      case 'QInput':
      default:
        return QInput
      case 'QSelect':
        return QSelect
    }
  }

  get localValue(): string {
    return this.value
  }

  set localValue(value: string) {
    this.$emit('input', value)
  }
}
</script>
