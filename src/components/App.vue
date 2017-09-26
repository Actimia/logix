<template lang='pug'>
  #app
    app-header
    main
      router-view
    footer.container
        p By #[a(href='https://twitter.com/Actim1a') @Actimia]
</template>

<script>
import AppHeader from './AppHeader.vue'
export default {
  name: 'app',
  components: {
    AppHeader
  }
}
</script>


<style>
  @import '../style/phoebix/phoebix.css';




</style>
