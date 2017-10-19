import Vue from 'vue'
import Vuex from 'vuex'
import createPersist from 'vuex-localstorage'
import { not, and, impl, equal, falsum } from './logic'

import mockdata from './assets/plots/weights.json'
import targetweights from './assets/plots/targetweights.json'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersist({
      namespace: 'logix',
      initialState: {},
      expires: 1000 * 60 * 60 * 24 * 7
    })
  ],
  state: {
    plots: mockdata,
    targetweights: targetweights,
    proof: [
      // {
      //   expr: atom('phi'),
      //   reasoning: {rule: 'premise'},
      //   boxes: 0,
      //   line: 0
      // },
      // {
      //   expr: impl(and(atom('phi'), atom('psi')), atom('chi')),
      //   reasoning: {rule: 'premise'},
      //   boxes: 0,
      //   line: 0
      // }
    ]
  },
  getters: {
    line (state, getters) {
      return function (idx) {
        return state.proof[idx]
      }
    },
    last (state) {
      if (state.proof.length !== 0) return state.proof[state.proof.length - 1]
    },
    boxes (state, getters) {
      let last = getters.last
      if (!last) return 0
      return last.boxes
    }
  },
  mutations: {
    doAddLine (state, line) {
      state.proof.push(line)
    },
    clear (state) {
      state.proof = []
    },
    removeLast (state) {
      state.proof.pop()
    },
    addWeight (state) {
      state.plots.push({
        measurement_type: 'weight',
        measured_at: new Date().toISOString(),
        value: 66
      })
    }
  },
  actions: {
    addLine (ctx, line) {
      // console.log(ctx.getters)
      line.boxdelta = line.boxdelta || 0
      let last = ctx.getters.last || {boxes: 0, line: -1}
      if (line.boxes === undefined) line.boxes = last.boxes + line.boxdelta
      line.line = last.line + 1
      ctx.commit('doAddLine', line)
    },
    and_intro (ctx, [ileft, iright]) {
      let left = ctx.state.proof[ileft].expr
      let right = ctx.state.proof[iright].expr
      ctx.dispatch('addLine', {
        expr: and(left, right),
        reasoning: {
          rule: 'and_intro',
          lines: [ileft, iright]
        }
      })
    },
    and_elim_1 (ctx, [istmt]) {
      let stmt = ctx.getters.line(istmt)
      if (stmt.expr.type !== 'and') throw Error('Must target conjunction')
      ctx.dispatch('addLine', {
        expr: stmt.expr.left,
        reasoning: {
          rule: 'and_elim_1',
          lines: [istmt]
        }
      })
    },
    and_elim_2 (ctx, [istmt]) {
      let stmt = ctx.getters.line(istmt)
      if (stmt.expr.type !== 'and') throw Error('Must target conjunction')
      ctx.dispatch('addLine', {
        expr: stmt.expr.right,
        reasoning: {
          rule: 'and_elim_2',
          lines: [istmt]
        }
      })
    },
    dnot_intro (ctx, [istmt]) {
      let expr = ctx.getters.line(istmt)
      ctx.dispatch('addLine', {
        expr: not(not(expr.expr)),
        reasoning: {
          rule: 'dnot_intro',
          lines: [istmt]
        }
      })
    },
    dnot_elim (ctx, [istmt]) {
      let stmt = ctx.getters.line(istmt)
      if (stmt.expr.type !== 'not' && stmt.expr.expr.type !== 'not') throw Error('Must target double negation')
      ctx.dispatch('addLine', {
        expr: stmt.expr.expr.expr,
        reasoning: {
          rule: 'dnot_elim',
          lines: [istmt]
        }
      })
    },
    copy (ctx, [istmt]) {
      let expr = ctx.getters.line(istmt)
      ctx.dispatch('addLine', {
        expr: expr.expr,
        reasoning: {
          rule: 'copy',
          lines: [istmt]
        }
      })
    },
    assume (ctx, [expr]) {
      ctx.dispatch('addLine', {
        type: 'assumption',
        expr,
        reasoning: {rule: 'assume'},
        boxdelta: 1
      })
    },
    premise (ctx, [expr]) {
      if (ctx.state.proof.length !== 0 &&
        ctx.getters.last.reasoning.rule !== 'premise') {
        throw Error('Cant add premises when non-premises are present')
      }
      ctx.dispatch('addLine', {
        type: 'premise',
        expr,
        reasoning: {rule: 'premise'}
      })
    },
    impl_intro (ctx, [istmt]) {
      let open = ctx.getters.line(istmt)
      if (open.type !== 'assumption') throw Error('Must target box')
      if (!ctx.state.proof.slice(istmt).reduce((prev, cur) => prev && (cur.boxes >= open.boxes), true)) throw Error('Must use unclosed box')
      let close = ctx.getters.last
      // ctx.commit('closeBox', close.line)
      ctx.dispatch('addLine', {
        expr: impl(open.expr, close.expr),
        boxdelta: -1,
        reasoning: {
          rule: 'impl_intro',
          lines: [[open.line, close.line]]
        }
      })
    },
    modus_ponens (ctx, [iimpl, istmt]) {
      let impl = ctx.getters.line(iimpl)
      let stmt = ctx.getters.line(istmt)
      let left = {...impl.expr.left}
      let expr = {...stmt.expr}
      if (!equal(left, expr)) throw Error('Invalid use of rule')

      ctx.dispatch('addLine', {
        expr: impl.expr.right,
        reasoning: {
          rule: 'modus_ponens',
          lines: [iimpl, istmt]
        }
      })
    },
    modus_tolens (ctx, [iimpl, istmt]) {
      let impl = ctx.getters.line(iimpl)
      let stmt = ctx.getters.line(istmt)
      if (stmt.expr.type === 'not' && impl.expr.type === 'impl') {
        let left = {...impl.expr.left}
        let right = {...impl.expr.right}
        let expr = {...stmt.expr.expr}

        if (equal(expr, right)) {
          ctx.dispatch('addLine', {
            expr: not(left),
            reasoning: {
              rule: 'modus_tolens',
              lines: [iimpl, istmt]
            }
          })
        }
      }
    },
    not_elim (ctx, [istmt1, istmt2]) {
      let left = ctx.getters.line(istmt1)
      let right = ctx.getters.line(istmt2)

      left = {...left.expr}
      right = {...right.expr}

      if (equal(not(left), right) || equal(left, not(right))) {
        ctx.dispatch('addLine', {
          expr: falsum(),
          reasoning: {
            rule: 'not_elim',
            lines: [istmt1, istmt2]
          }
        })
      }
    },
    not_intro (ctx, [istmt]) {
      let open = ctx.getters.line(istmt)
      if (!ctx.state.proof.slice(istmt).reduce(
        (prev, cur) => prev && (cur.boxes >= open.boxes), true)) {
        throw Error('Must use unclosed box')
      }
      if (ctx.getters.last.expr.type === 'falsum') {
        ctx.dispatch('addLine', {
          expr: not({...open.expr}),
          boxdelta: -1,
          reasoning: {
            rule: 'not_intro',
            lines: [istmt]
          }
        })
      }
    },
    falsum (ctx, [istmt, expr]) {
      let stmt = ctx.getters.line(istmt)

      if (stmt.expr.type === 'falsum') {
        ctx.dispatch('addLine', {
          expr: expr,
          reasoning: {
            rule: 'falsum',
            lines: [istmt]
          }
        })
      }
    },
    pbc (ctx, [istmt]) {
      let stmt = ctx.getters.line(istmt)
      if (!ctx.state.proof.slice(istmt).reduce(
          (prev, cur) => prev && (cur.boxes >= stmt.boxes), true)) {
        throw Error('Must use unclosed box')
      }

      let last = ctx.getters.last
      if (stmt.expr.type === 'not' && last.expr.type === 'falsum') {
        ctx.dispatch('addLine', {
          expr: {...stmt.expr.expr},
          boxdelta: -1,
          reasoning: {
            rule: 'pbc',
            lines: [istmt]
          }
        })
      }
    }
  }
})
