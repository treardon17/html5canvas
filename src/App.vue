<template lang="pug">
  #app
    router-view
</template>

<script>
import debug from 'debug'
let log = debug('App')
export default {
  name: 'app',
  mounted: function () {
    log('App Mounted')
  },
  computed: {
  },
  methods: {
  },
  components: {
  }
}
</script>

<style lang="scss">
@import "./styles/main";
#app {
}
</style>
