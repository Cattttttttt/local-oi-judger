import * as paths from '@config/paths'
import * as test from '../test'
import { Compiler } from './compiler'

const gcc = new Compiler()
console.log(gcc.ready)
setTimeout(() => {
  console.log(gcc.ready)
}, 1000)