<template lang="pug">
  .console
    Statement(v-for="stmt in proof" v-bind:key='stmt.line' v-bind:statement='stmt')
    .controls
      form(v-on:submit.prevent="processInput")
        input(v-model="input")
      .buttons
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
    font-family: monospace;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    padding: 20px;
    color: #42b983;
    border-radius: 25px;
    /*background-color: #383838;*/

    counter-reset: linenumber;

    .controls {
      display: flex;
    }

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
        color: #42b983;
        background: none;
        flex: 1;
        padding: 0.25em 0.25em;
        margin: 0.5em 0.25em;

        border: none;
        border-radius: 1px;

        &:focus {
          outline: none;
          border-bottom: 1px solid;
        }
      }


    }

    .buttons {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      button {
        color: var(--text-color);
        background: none;
        border: 1px solid;
        padding: 0.25em 0.5em;
        margin: 0 5px;
        border-radius: 1px;
        font-size: 1em;
        &:hover {
          box-shadow: 0 0 4px var(--text-color),
          0 0 4px var(--text-color) inset;
        }
        &:active {
          box-shadow: 0 0 4px var(--text-color);
        }
      }
    }
  }
</style>
