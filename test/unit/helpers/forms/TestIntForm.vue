<template>
  <div>
    <q-input
      v-model="testInt"
      name="testInt"
      type="number"
    />
  </div>
</template>

<script>
import { QInput } from 'quasar'

export default {
  name: 'TestIntForm',
  components: {
    QInput,
  },
  props: {
    testInt: {
      type: Number,
      required: true,
    },
  },
}
</script>
