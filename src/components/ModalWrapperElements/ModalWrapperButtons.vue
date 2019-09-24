<template>
  <div class="modal-form-buttons row">
    <slot name="abort">
      <q-btn
        color="primary"
        class="abort"
        data-name="abort-modal-wrapper"
        flat
        label="Annuleren"
        @click="$emit('close')"
      />
    </slot>
    <slot name="submit">
      <q-btn
        color="primary"
        class="confirm"
        data-name="submit-modal-wrapper"
        flat
        label="Bevestigen"
        @click="$emit('submit')"
      />
    </slot>
  </div>
</template>

<script lang=ts>
import QBtn from 'quasar/src/components/btn/QBtn'
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
  components: {
    QBtn,
  },
})
export default class ModalWrapperButtons extends Vue {}
</script>

<style lang="stylus" scoped>
.modal-form-buttons
  padding 0px 8px 8px
  -ms-flex-pack end
  justify-content flex-end
</style>
