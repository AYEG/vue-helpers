<template>
  <q-modal
    v-model="open"
    v-bind="$attrs"
    v-on="$listeners"
    @hide="open = false"
  >
    <div class="modal-header">{{ title }}</div>

    <div class="modal-form-body">
      <slot name="content" />
    </div>

    <div class="modal-form-buttons row">
      <slot name="abort">
        <q-btn
          color="primary"
          class="abort"
          flat
          @click="open = false"
        >
          Annuleren
        </q-btn>
      </slot>
      <slot name="submit">
        <q-btn
          color="primary"
          class="confirm"
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

<script>
import { QBtn, QModal, QInnerLoading, QSpinnerGears } from 'quasar'

export default {
  name: 'ModalWrapper',
  components: {
    QBtn,
    QModal,
    QInnerLoading,
    QSpinnerGears,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    showLoading: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      refOpen: false,
    }
  },
  computed: {
    open: {
      get () { return this.value || this.refOpen },
      set (value) {
        this.refOpen = false
        this.$emit('input', value)
      },
    },
  },
  methods: {
    refOpenModal () {
      this.refOpen = true
    },
    refCloseModal () {
      this.refOpen = false
    },
  },
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
