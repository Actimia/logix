import { isEqual } from 'lodash'

export function atom (name) {
  return {
    type: 'atom',
    atom: name
  }
}

export function not (expr) {
  return {
    type: 'not',
    expr
  }
}

export function and (left, right) {
  return {
    type: 'and',
    left,
    right
  }
}

export function or (left, right) {
  return {
    type: 'or',
    left,
    right
  }
}

export function impl (left, right) {
  return {
    type: 'impl',
    left,
    right
  }
}

export function falsum () {
  return {
    type: 'falsum'
  }
}

export function parse (text) {
  let atomrx = /:([a-z]+)/g
  let atomized = text.replace(atomrx, 'atom("$1")')

  let context = {atom, and, or, not, impl}
  function doEval () {
    /* eslint-disable no-eval */  // yeeeee boi
    return eval(atomized)
  }

  return doEval.call(context)
}

export function equal (left, right) {
  return isEqual(left, right)
}

export const rules = {
  'premise': {
    args: ['expr'],
    pretty: 'Premise'
  },
  'assume': {
    args: ['expr'],
    pretty: 'Assume'
  },
  'falsum': {
    args: ['line', 'expr'],
    pretty: '⊥e'
  },
  'copy': {
    args: ['line'],
    pretty: 'Copy'
  },
  'and_elim_1': {
    args: ['line'],
    pretty: '∧e1'
  },
  'and_elim_2': {
    args: ['line'],
    pretty: '∧e2'
  },
  'and_intro': {
    args: ['line', 'line'],
    pretty: '∧i'
  },
  'dnot_intro': {
    args: ['line'],
    pretty: '¬¬i'
  },
  'dnot_elim': {
    args: ['line'],
    pretty: '¬¬e'
  },
  'impl_intro': {
    args: ['line'],
    pretty: '→i'
  },
  'modus_ponens': {
    args: ['line', 'line'],
    pretty: '→e'
  },
  'modus_tolens': {
    args: ['line', 'line'],
    pretty: 'MT'
  },
  'not_elim': {
    args: ['line', 'line'],
    pretty: '¬e'
  },
  'not_intro': {
    args: ['line'],
    pretty: '¬i'
  },
  'pbc': {
    args: ['line'],
    pretty: 'PBC'
  }
}
