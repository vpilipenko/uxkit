import tree from './state'

import { root } from 'baobab-connect'


// Default API url
let prefix = 'https://merlin-dev.avto-pass.net'

const { MERLIN_ROOT } = process.env

if (MERLIN_ROOT) {
  prefix = MERLIN_ROOT
} else {
  console.warn(`🔥🔥🔥 MERLIN_ROOT is not defined, default is ${prefix} 🔥🔥🔥`)
}

tree.select('api', 'root').set(`${prefix.replace(/\/$/i, '')}/`)

const defaultState = tree.get()
tree.select('defaultState').set(defaultState)


root(tree)