<template>
  <modal-wrapper
    ref="modalWrapper"
    title="Activatiecodes genereren"
    @show="atShow"
    @hide="atHide"
    @escape-key="atEscape"
  >
    <template slot="content">
      <div>content</div>
    </template>
  </modal-wrapper>
</template>

<script>
import ModalWrapper from 'src/components/ModalWrapper'

export default {
  components: {
    ModalWrapper,
  },
  methods: {
    atShow () {},
    atHide () {},
    atEscape () {},
  },
}
</script>
