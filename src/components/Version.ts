import { CreateElement, VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Version extends Vue {
  @Prop({ required: true, type: String }) public version!: string

  public render(createElement: CreateElement): VNode | null {
    if (this.version) {
      return createElement('span', { class: 'version' }, 'Versie: ' + this.version)
    }

    return null
  }
}
