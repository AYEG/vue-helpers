<template>
  <div v-show="title !== ''" class="modal-header">
    {{ title }}
  </div>
</template>

<script lang=ts>
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
  components: {},
})
export default class ModalWrapperTitle extends Vue {
  @Prop({ type: String, default: '' }) public title!: string
}
</script>

<style lang="stylus" scoped>
.modal-form-body
  padding 10px 24px
  color rgba(0, 0, 0, 0.5)
</style>
