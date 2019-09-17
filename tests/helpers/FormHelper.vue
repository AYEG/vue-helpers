<template>
  <uw-input v-model="model" v-validate="'required'" name="input1" />
</template>

<script lang=ts>
import UwInput from 'src/components/UwInput.vue'
import { Validator } from 'vee-validate'
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component({
  components: { UwInput },
})
export default class FormHelper extends Vue {
  @Provide() public parentValidator: Validator = this.$validator
  public model = ''
}
</script>
