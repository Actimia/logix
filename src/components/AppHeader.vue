<template lang="pug">
  header.container
    .brand
      router-link(to='/')
        phoebix-logo
      h1 Phoebix
    nav
      router-link(to="/") Logix
      router-link(to="/test/") CSS
      router-link(to="/blog/") Blog
      router-link(to="/plots/") Plots
      router-link(to="/asdf/") 404
</template>
<script>
  import PhoebixLogo from './Logo.vue'
  export default {
    name: 'app-header',
    components: {
      'phoebix-logo': PhoebixLogo
    }
  }
</script>
<style>
  header {
    padding: 20px;

    .brand {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      a {
        flex: 0 0 auto;
      }
      h1 {
        margin: 0 0 0 20px;
        flex: 1;
      }
    }

  }
</style>
