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

<script lang=ts>
import ModalWrapper from 'src/components/ModalWrapper.vue'
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  components: { ModalWrapper },
})
export default class TestModalWrapper extends Vue {
  atShow() { }

  atHide() {}

  atEscape() {}
}
</script>
