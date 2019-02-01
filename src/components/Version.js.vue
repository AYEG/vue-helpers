<script>
export default {
  props: {
    version: {
      type: String,
      required: true,
    },
  },
  render(createElement) {
    if (this.version) {
      return createElement('span', { class: 'version' }, 'Versie: ' + this.version)
    }

    return null
  },
}
</script>
