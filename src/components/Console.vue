<template lang="pug">
  .console
    Statement(v-for="stmt in proof" v-bind:key='stmt.line' v-bind:statement='stmt')
    .container.horizontal
      form(v-on:submit.prevent="processInput")
        input(v-model="input")
      .container.horizontal
        button(@click="clear") Clear
        button(@click="undo") Undo
</template>
<script>
  import Statement from './Statement'
  import { parse, rules } from '../logic'
  import { mapMutations } from 'vuex'

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
      },
      ...mapMutations({
        clear: 'clear',
        undo: 'removeLast'
      })
    },
    components: {
      Statement
    }
  }
</script>
<style>
  .console {
    display: flex;
    align-items: stretch;
    flex-direction: column;
    padding: 20px;

    form {
      width: 100%;
      align-items: baseline;
      flex-direction: row;
      padding: 0;

      &::before {
        content: ">";
        width: 3em;
      }

      input {
        font-size: 1.2em;
        font-family: var(--font-stack-mono);
        color: inherit;
        flex: 1;
        padding: 0.25em 0.25em;
        margin: 0.5em 0.25em;

        border: none;
        border-bottom: 1px solid transparent;
        border-radius: 1px;

        &:focus {
          outline: none;
          border-bottom: 1px solid;
        }
      }
    }

  }
</style>
