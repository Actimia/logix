<template lang='pug'>
  .reasoning
    .rule {{ translateRule(reason.rule) }}
    .lines
      .line(v-for="line in reason.lines") {{formatLine(line)}}
</template>
<script>
  import { rules } from '../logic'
  export default {
    props: ['reason'],
    methods: {
      translateRule (rule) {
        return (rules[rule] || {pretty: 'Unknown'}).pretty
      },
      formatLine (line) {
        if (Number.isInteger(line)) {
          return line
        } else if (line instanceof Array && line.length === 2) {
          let [a, b] = line
          return `${a}-${b}`
        }
      }
    }
  }
</script>
<style>
  .reasoning {
    flex: 20% 0 1;
    display: flex;

    .lines {
      display: flex;
      margin-left: 0.5em;
      .line {
        + .line::before {
          content: ',';
          margin-right: 0.25em;
        }
      }
    }
  }
</style>
