import Vue from 'vue'
import Vuex from 'vuex'
import { not, and, impl } from './logic'
import { _ } from 'lodash'
Vue.use(Vuex)

export function unused () {
  _.slice([1, 2, 3])
}

export default new Vuex.Store({
  state: {
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
    closeBox (state, line) {
      state.proof[line].boxdelta = -1
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
      if (!window._.isEqual(left, expr)) throw Error('Invalid use of rule')

      ctx.dispatch('addLine', {
        expr: impl.expr.right,
        reasoning: {
          rule: 'modus_ponens',
          lines: [iimpl, istmt]
        }
      })
    }
  }
})
