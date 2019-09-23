<template>
  <q-select
    use-input
    :options="filteredOptions"
    v-bind="$attrs"
    v-on="$listeners"
    @filter="filterFunction"
  >
    <slot />
  </q-select>
</template>

<script lang="ts">
import QSelect from 'quasar/src/components/select/QSelect'
import { IQSelectOptions } from 'src/quasar-types'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {
    QSelect,
  },
})
export default class SelectWithFilter extends Vue {
  @Prop({ type: Array, default: [] }) public options!: IQSelectOptions[]

  public filteredOptions: IQSelectOptions[] = this.options
  // tslint:disable-next-line:no-any
  public filterFunction(val: string, update: any): void {
    if (val === '') {
      update(() => {
        this.filteredOptions = this.options
      })
      return
    }

    update(() => {
      const needle = val.toLowerCase()
      this.filteredOptions = this.options.filter((v: IQSelectOptions): boolean => {
        return v.label.toLowerCase().indexOf(needle) > -1
      })
    })
  }
}
</script>
