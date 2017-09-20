<template lang="pug">
.header
  a(href='/')
    img(src='../assets/logo.png')
  h1 Logix
</template>
<script>
export default {
  name: 'app-header'
}
</script>
<style>
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: var(--content-width);

  }
</style>
