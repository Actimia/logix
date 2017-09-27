<template lang='pug'>
  .container
    h1 Phoebix.css
    p {{ lorem }}
    form
      fieldset
        legend About you
        label(for='name') Name
        input#name(name="name", type="text")
        label(for='age') Age
        input#age(name='age', type="number")
      fieldset
        legend Color
        input#red(type="radio", name="color", value="r")
        label(for='red') Red
        input#blue(type="radio", name="color", value="g")
        label(for='blue') Blue
        input#green(type="radio", name="color", value="b")
        label(for='green') Green

      fieldset
        input#cbox1(type="checkbox", required)
        label(for='cbox1') Agree?

        button Submit
      //button(type="submit") Submit
    p {{ lorem }}
    ul
      li Reason 1
      li Reason 2
        ul
          li Subreason 1
          li Subreason 2
          li Subreason 3
      li Reason 3
    p {{ lorem }}
    table
      thead
        th City
        th Name
        th(width="15%") Wins
        th(width="15%") Losses
      tr
        td Kansas City
        td Chiefs
        td 3
        td 0
      tr
        td New England
        td Patriots
        td 2
        td 1
      tr
        td Seattle
        td Seahawks
        td 1
        td 2
    h2 H2 Test
    p {{ lorem }}
    img(src="https://placebear.com/g/400/300")
    p {{ lorem }}


</template>
<script>
  export default {
    data () {
      return {
        lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    }
  }
</script>
<style>

</style>
