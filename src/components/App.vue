<template lang='pug'>
  #app
    app-header
    .content
      router-view
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
  @import '../style/variables.css';
  @import '../style/typography.css';

  body {
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #app {
    width: 100%;
    min-height: 100vh;
    height: 100%;
    padding: 10px;
    background-color: var(--bg-color);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    max-width: var(--content-width);
    width: 100%;
  }
</style>
