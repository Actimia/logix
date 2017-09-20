<template lang="pug">
  .console
    Statement(v-for="stmt in proof" v-bind:key='stmt.line' v-bind:statement='stmt')
    form(v-on:submit.prevent="processInput")
      input(v-model="input")
</template>
<script>
  import Statement from './Statement'
  import { parse, rules } from '../logic'
  export default {
    data: function () {
      return {
        input: ''
      }
    },
    computed: {
      proof () {
        return this.$store.state.proof
      }
    },
    methods: {
      processInput () {
//        let last = this.$store.getters.last.line
//        this.$store.dispatch('and_intro', [last - 1, last])
        if (!this.input.trim()) return
        let split = this.input.split(' ')
        let command = split.shift()
        let argrules = rules[command].args
        let args = []
        for (let argrule of argrules) {
          if (argrule === 'line') {
            args.push(Number(split.shift()))
          } else if (argrule === 'expr') {
            args.push(parse(split.join('')))
          }
        }
        this.$store.dispatch(command, args)
      }
    },
    components: {
      Statement
    }
  }
</script>
<style>
.console {
  font-family: monospace;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 20px;
  color: #42b983;
  border-radius: 5px;
  background-color: #333;

  counter-reset: linenumber;

  form {
    display: flex;
    width: 100%;
    align-items: baseline;

    &::before {
      content: ">";
      width: 3em;
    }

    input {
      font-family: monospace;
      font-size: 1.2em;
      margin-top: 1em;
      color: #42b983;
      border: none;
      background: none;
      flex: 1;
      padding: 0.5em 0.25em;
      margin-left: 0.25em;
    }
  }

  > .console-line {

    margin: 0;

    &::before {
      counter-increment: linenumber;
      content: counter(linenumber) ':';
      margin-right: 0.5em;
    }

    .atom {
      font-style: italic;
      &::before {
        content: attr(data-atom);
      }

      &[data-atom='chi']::before { content: 'χ'; }
      &[data-atom='psi']::before { content: 'ψ'; }
      &[data-atom='phi']::before { content: 'φ'; }
      &[data-atom='omega']::before { content: 'ω'; }
      &[data-atom='alpha']::before { content: 'α'; }
      &[data-atom='beta']::before { content: 'β'; }
      &[data-atom='tau']::before { content: 'τ'; }
    }

    .conn {
      font-weight: bold;

      &.not::before { content: '¬' }
      &.or::before { content: '∨' }
      &.and::before { content: '∧' }
      &.impl::before { content: '→' }
    }
  }
}
</style>
