<template lang='pug'>
  .statement
    .linenumber {{statement.line}}
    .box.left(v-for="n in statement.boxes")
    .innerbox(:class="boxclass")
      .expression
        Expression(:expr="statement.expr")
      Reasoning(:reason="statement.reasoning")
    .box.right(v-for="n in statement.boxes")
</template>
<script>
  import Expression from './Expression'
  import Reasoning from './Reasoning'
  export default {
    props: ['statement'],
    components: { Expression, Reasoning },
    methods: {
      iota (n) {
        return Array(n).fill().map((_, i) => i * i)
      }
    },
    computed: {
      boxclass () {
        return {
          'start': this.statement.boxdelta === 1,
          'end': this.statement.boxdelta === -1
        }
      }
    }
  }
</script>
<style>
  .statement {
    line-height: 2.0em;
    display: flex;
    width: 100%;

    .linenumber {
      flex: 3em 0 0;
    }

    .innerbox{
      padding: 0 1em;
      display: flex;
      flex: 1;

      &.start {
        border-top: 1px solid;

      }

      &.end {
        border-top: 1px solid;
        margin: 0 0.2em;
        padding: 0 0.8em;
      }

      .expression {
        flex: 1;
      }
    }

    .box {
      &.left {
        border-right: 1px solid;
        margin-left: 0.2em;
      }

      &.right {
        border-left: 1px solid;
        margin-right: 0.2em;
      }
    }
  }
</style>
