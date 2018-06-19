<template>
  <div>
    <q-chips-input
      v-model="testChips"
      name="testChips"
    />
  </div>
</template>

<script>
import { QChipsInput } from 'quasar'

export default {
  name: 'TestChipsForm',
  components: {
    QChipsInput,
  },
  props: {
    testChips: {
      type: Array,
      required: true,
    },
  },
}
</script>
