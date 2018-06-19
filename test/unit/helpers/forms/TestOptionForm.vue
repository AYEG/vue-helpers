<template>
  <div>
    <q-select
      v-model="testOption"
      :options="options"
      name="testOption"
    />
  </div>
</template>

<script>
import { QSelect } from 'quasar'

export default {
  name: 'TestOptionForm',
  components: {
    QSelect,
  },
  props: {
    testOption: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      options: [
        {label: 'a', value: '1'},
        {label: 'b', value: '2'},
        {label: 'c', value: '3'},
      ],
    }
  },
}
</script>
