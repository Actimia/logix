<template lang='pug'>
  .plottest.content
    h1 What are you plotting?
    div#testing
    button(@click.prevent="addWeight") Weigh
</template>
<script>
  import plotly from 'plotly.js/dist/plotly'
  import { mapMutations } from 'vuex'
  export default {
    computed: {
      weightdata () { return this.$store.state.plots.filter(m => m.measurement_type === 'weight') },
      heightdata () { return this.$store.state.plots.filter(m => m.measurement_type === 'height') },
      targetweights () { return this.$store.state.targetweights }
    },
    mounted () {
      this.makePlot()
    },
    methods: {
      makePlot () {
        function round (x, digits = 1) {
          digits = Math.pow(10, digits)
          return Math.round(x * digits) / digits
        }
        plotly.plot('testing',
          [
            {
              type: 'line',
              mode: 'line',
              name: 'Weight',
              line: {
                color: 'cornflowerblue'
              },
              x: this.weightdata.map(x => x.measured_at),
              y: this.weightdata.map(y => y.value)
            },
            {
              type: 'line',
              mode: 'line',
              name: 'Height',
              line: {
                dash: 'dot',
                color: 'red'
              },
              x: this.heightdata.map(x => x.measured_at),
              y: this.heightdata.map(y => y.value)
            },
            {
              type: 'line',
              mode: 'line',
              name: 'Target weight',
              line: {
                dash: 'dot',
                color: 'white'
              },
              y: this.targetweights.map(y => round(y.upper)),
              x: this.targetweights.map(x => x.target_date)
            },
            {
              type: 'line',
              mode: 'line',
              name: 'Target weight',
              showlegend: false,
              line: {
                dash: 'dot',
                color: 'white'
              },
              y: this.targetweights.map(y => round(y.lower)),
              x: this.targetweights.map(x => x.target_date)
            }
          ],
          {
            margin: {
              l: 50,
              r: 25,
              t: 25,
              b: 25,
              pad: 12
            },
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'rgba(255,255,255,0.1)',
            font: {
              color: '#42b983'
            }
          },
          {
            displayModeBar: false
          }
        )
      },
      ...mapMutations(['addWeight'])
    }
  }
</script>
<style>

</style>
