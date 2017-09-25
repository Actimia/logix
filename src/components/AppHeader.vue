<template lang="pug">
.header
  img(src='../assets/logix.png')
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
    padding: 20px;

  }
</style>
