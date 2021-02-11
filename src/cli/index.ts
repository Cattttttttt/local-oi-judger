import * as paths from '@config/paths'
import * as test from '../test'
import { Compiler } from './compiler'
import { Judger } from './judger'

const gcc = new Compiler()

const compileTest = async () => {
  return await gcc.compile('../../p1001.cpp')
}


const tt = async () => {
  const out = await compileTest()
  const jj = new Judger(out.output)
  jj.test()
}
tt()
