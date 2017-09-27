<template lang='pug'>
  .container.blog-index
    article.blog-entry
      a(href="")
        h2 On the properties of thingys
        p 2017-08-23
    article.blog-entry
      a(href="")
        h2 What would we have done differently?
        p 2017-09-17
    article.blog-entry
      a(href="")
        h2 The Essence of Matter
        p 2017-09-26
</template>
<script>
  export default {}
</script>
<style>
  .blog-index {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .blog-entry {
    width: calc(50% - 1em);
    border: 1px solid;
    margin: 0.5em;
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    > a {
      display: flex;
      color: inherit;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      h2 {
        font-size: 1em;
        text-align: center;
        flex: 1;
      }
    }
  }
</style>
