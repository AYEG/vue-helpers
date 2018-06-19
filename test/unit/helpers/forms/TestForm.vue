<template>
  <div>
    <q-input
      v-model="testText"
      name="testText"
    />
    <q-input
      v-model="testInt"
      name="testInt"
      type="number"
    />
    <q-select
      v-model="testMultiOption"
      :options="multiOptions"
      :multiple="true"
      name="testMultiOption"
    />
    <q-select
      v-model="testOption"
      :options="options"
      name="testOption"
    />
    <q-chips-input
      v-model="testChips"
      name="testChips"
    />
  </div>
</template>

<script>
import { QInput, QSelect, QChipsInput } from 'quasar'

export default {
  name: 'TestForm',
  components: {
    QInput,
    QSelect,
    QChipsInput,
  },
  props: {
    testText: {
      type: String,
      required: true,
    },
    testInt: {
      type: Number,
      required: true,
    },
    testMultiOption: {
      type: Array,
      required: true,
    },
    testOption: {
      type: String,
      required: true,
    },
    testChips: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      multiOptions: [
        {label: 'a', value: '1'},
        {label: 'b', value: '2'},
        {label: 'c', value: '3'},
      ],
      options: [
        {label: 'd', value: '4'},
        {label: 'e', value: '5'},
        {label: 'f', value: '6'},
      ],
    }
  },
}
</script>
