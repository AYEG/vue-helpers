<template>
  <div>
    <q-input
      v-model="testText"
      name="testText"
    />
  </div>
</template>

<script>
import { QInput } from 'quasar'

export default {
  name: 'TestTextForm',
  components: {
    QInput,
  },
  props: {
    testText: {
      type: String,
      required: true,
    },
  },
}
</script>
