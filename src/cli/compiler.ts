import { exec } from 'child_process'

import { shEscape } from './utils'
import * as paths from '@config/paths'

export class Compiler {

  private gccPath: string
  /**
   * 1 - Compiler ready
   * 
   * 2 - GCC Error
   * 
   * 3 - Compiler standby for initial
   * 
   * 4 - Compiler initial
   *
   * @type {number}
   * @memberof Compiler
   */
  public ready: number

  constructor(gccPath: string = paths.gccPath) {
    this.gccPath = gccPath
    this.ready = 3
    this.initCompiler()
  }

  private initCompiler() {
    this.ready = 4
    exec(shEscape(this.gccPath) + ' -v', err => {
      if(err) {
        console.error(err)
        this.ready = 2
      } else {
        this.ready = 1
      }
    })
  }

  public compile(compileArgs: string = paths.gccArgs) {

  }

}