<template lang="pug">
  header.container
    .brand
      a(href='/')
        img(src='../assets/phoebix-small.png')
      h1 Phoebix
    nav
      a(href="/") Home
      a(href="/test/") CSS
      a(href="/test/") About
      a(href="/test/") Buy
      a(href="/test/") Whatever
</template>
<script>
  export default {
    name: 'app-header'
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
    nav {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;

      a {
        color: inherit;
        padding: 0.25em 0.5em;
        margin: 0 0.5em;
        border-bottom: 2px solid transparent;
        &:visited {
          color: inherit;
        }
        &:hover {
          color: var(--accent-color);
          border-bottom: 2px solid;
          text-decoration: none;
        }
      }
    }
  }
</style>
