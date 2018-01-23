<template lang="pug">
  .home-page
    canvas-example
</template>

<script>
import CanvasExample from '@/components/CanvasExample'

export default {
  name: 'home',
  props: [],
  data () {
    return {
    }
  },
  beforeCreate: function () {
  },
  mounted: function () {
  },
  computed: {
  },
  methods: {
  },
  components: {
    'canvas-example': CanvasExample
  }
}
</script>

<style scoped lang="scss">
@import "../styles/_variables";
@import "../styles/_mixins";
.home {

}
</style>
