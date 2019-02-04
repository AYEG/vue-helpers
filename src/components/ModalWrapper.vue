<template>
  <q-modal
    v-model="opened"
    v-bind="$attrs"
    v-on="$listeners"
    @hide="opened = false"
  >
    <div v-show="title !== ''" class="modal-header">{{ title }}</div>

    <div class="modal-form-body">
      <slot name="content" />
    </div>

    <div v-if="buttonsEnabled" class="modal-form-buttons row">
      <slot name="abort">
        <q-btn
          color="primary"
          class="abort"
          data-name="abort-modal-wrapper"
          flat
          @click="opened = false"
        >
          Annuleren
        </q-btn>
      </slot>
      <slot name="submit">
        <q-btn
          color="primary"
          class="confirm"
          data-name="submit-modal-wrapper"
          flat
          @click="$emit('submit')"
        >
          Bevestigen
        </q-btn>
      </slot>
    </div>
    <q-inner-loading :visible="showLoading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-modal>
</template>

<script lang=ts>
import { QBtn, QInnerLoading, QModal, QSpinnerGears } from 'quasar'
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
  components: {
    QBtn,
    QModal,
    QInnerLoading,
    QSpinnerGears,
  },
})
export default class ModalWrapper extends Vue {
  @Prop({ type: Boolean, default: false }) public value!: boolean
  @Prop({ type: String, default: '' }) public title!: string
  @Prop({ type: Boolean, default: false }) public showLoading!: boolean
  @Prop({ type: Boolean, default: true }) public buttonsEnabled!: boolean

  public refOpen: boolean = false

  get opened(): boolean {
    return this.value || this.refOpen
  }

  set opened(value: boolean) {
    this.refOpen = false
    this.$emit('input', value)
  }

  public open(): void {
    this.refOpen = true
  }

  public close(): void {
    this.refOpen = false
  }
}
</script>

<style lang="stylus" scoped>
  .modal-form-body
    padding: 10px 24px
    color: rgba(0, 0, 0, 0.5)

  .modal-form-buttons
    padding: 0px 8px 8px;
    -ms-flex-pack: end;
    justify-content: flex-end;
</style>
