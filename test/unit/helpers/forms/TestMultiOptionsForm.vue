<template>
  <div>
    <q-select
      v-model="testMultiOption"
      :options="options"
      :multiple="true"
      name="testMultiOption"
    />
  </div>
</template>

<script>
import { QSelect } from 'quasar'

export default {
  name: 'TestMultiOptionForm',
  components: {
    QSelect,
  },
  props: {
    testMultiOption: {
      type: Array,
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
