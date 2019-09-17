import { CreateElement, VNode } from 'vue';
import { Vue } from 'vue-property-decorator';
export default class Version extends Vue {
    version: string;
    render(createElement: CreateElement): VNode | null;
}
