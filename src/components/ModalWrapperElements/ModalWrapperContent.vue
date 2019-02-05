<template>
  <div class="modal-form-body">
    <slot />
  </div>
</template>

<script lang=ts>
import { QBtn } from 'quasar'
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
  components: {
    QBtn,
  },
})
export default class ModalWrapperContent extends Vue {}
</script>

<style lang="stylus" scoped>
  .modal-form-body
    padding: 10px 24px
    color: rgba(0, 0, 0, 0.5)
</style>
