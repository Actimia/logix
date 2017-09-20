<template lang="pug">
  .expr.and(v-if="expr.type === 'and'")
    Expression(:expr="expr.left")
    span.conn.and
    Expression(:expr="expr.right")
  .expr.or(v-else-if="expr.type === 'or'")
    Expression(:expr="expr.left")
    span.conn.or
    Expression(:expr="expr.right")
  .expr.impl(v-else-if="expr.type === 'impl'")
    Expression(:expr="expr.left")
    span.conn.impl
    Expression(:expr="expr.right")
  .expr.not(v-else-if="expr.type === 'not'")
    span.conn.not
    Expression(:expr="expr.expr")
  .expr.atom(v-else-if="expr.type === 'atom'", :data-atom="expr.atom")
</template>
<script>
  export default {
    name: 'Expression',
    props: ['expr']
  }
</script>
<style>
  .expr {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: baseline;
    /*flex: 1;*/

    > .expr.and,
    > .expr.or,
    > .expr.impl,
    &:not(.not) > .expr.not {
      &::before {
        content: '(';
      }
      &::after {
        content: ')';
      }
    }

    .conn {
      font-weight: bold;
      margin: 0 0.5em;

      &.not {
        margin: 0;
      }

      &.not::before { content: '¬' }
      &.or::before { content: '∨' }
      &.and::before { content: '∧' }
      &.impl::before { content: '→' }
    }

    &.atom {
      /*font-style: italic;*/
      /*margin: 0 0.25em;*/
      &::before {
        content: attr(data-atom)
      }

      &[data-atom='chi']::before { content: 'χ'; }
      &[data-atom='psi']::before { content: 'ψ'; }
      &[data-atom='phi']::before { content: 'φ'; }
      &[data-atom='omega']::before { content: 'ω'; }
      &[data-atom='alpha']::before { content: 'α'; }
      &[data-atom='beta']::before { content: 'β'; }
      &[data-atom='tau']::before { content: 'τ'; }
    }
  }
</style>
