<template>
  <div>
    <uw-input
      v-validate="'required'"
      v-model="contactPerson.role"
      :options="roleOptions"
      input="QSelect"
      name="role"
      label="Rol"
    />
    <q-btn color="primary" @click="submit">Submit</q-btn>
  </div>
</template>

<script lang=ts>
import { QButton } from 'quasar'
import UWInput from 'src/components/UWInput/UWInput.vue'
import { Validator } from 'vee-validate'
import Vue from 'vue'
import { Component, Inject, Prop } from 'vue-property-decorator'

@Component({
  components: {
    UWInput,
    QButton,
  },
})
// TODO - controleren
export default class ContactForm extends Vue {
  @Inject('parentValidator') public $validator!: Validator
  @Prop() public input!: string
  @Prop({ required: true }) public value!: string
  @Prop({ required: true }) public name!: string
  @Prop({ required: false, default: '' }) public validatorScope!: string
  @Prop({ required: false, default: '' }) public label!: string
}
</script>
