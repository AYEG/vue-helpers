<template>
  <q-dialog
    v-model="opened"
    data-name="dialog"
    v-bind="$attrs"
    v-on="$listeners"
    @hide="opened = false"
  >
    <modal-wrapper-title :title="title" />

    <modal-wrapper-content>
      <slot name="content" />
    </modal-wrapper-content>

    <slot name="buttons">
      <ModalWrapperButtons v-on="$listeners" @close="opened = false" />
    </slot>
    <q-inner-loading :showing="showLoading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-dialog>
</template>

<script lang=ts>
import QDialog from 'quasar/src/components/dialog/QDialog'
import QInnerLoading from 'quasar/src/components/inner-loading/QInnerLoading'
import QSpinnerGears from 'quasar/src/components/spinner/QSpinnerGears'
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import ModalWrapperButtons from './ModalWrapperButtons.vue'
import ModalWrapperContent from './ModalWrapperContent.vue'
import ModalWrapperTitle from './ModalWrapperTitle.vue'

@Component({
  components: {
    ModalWrapperTitle,
    ModalWrapperButtons,
    ModalWrapperContent,
    QDialog,
    QInnerLoading,
    QSpinnerGears,
  },
})
export default class ModalWrapper extends Vue {
  @Prop({ type: Boolean, default: false }) public value!: boolean
  @Prop({ type: String, default: '' }) public title!: string
  @Prop({ type: Boolean, default: false }) public showLoading!: boolean

  public refOpen: boolean = false

  get opened(): boolean {
    return this.value || this.refOpen
  }

  set opened(value: boolean) {
    this.refOpen = false
    this.$emit('input', value)
  }

  public show(): void {
    this.refOpen = true
  }

  public hide(): void {
    this.refOpen = false
  }

  /**
   * @deprecated since version 1.0.10
   */
  public open(): void {
    this.show()
  }

  /**
   * @deprecated since version 1.0.10
   */
  public close(): void {
    this.hide()
  }
}
</script>
