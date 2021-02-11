import { exec, execSync } from 'child_process'
import * as utils from 'util'
import * as path from 'path'
import * as fs from 'fs'
import { cyan, green, red } from 'chalk'

import { shEscape } from './utils'
import * as paths from '@config/paths'

const execPromise = utils.promisify(exec)

interface CompileReturn {
  message: string,
  output?: string,
}

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
    this.gccPath = shEscape(gccPath)
    this.ready = 3
    this.initCompiler()
  }

  private initCompiler() {
    this.ready = 4
    try {
      execSync(`${this.gccPath} -v`, { stdio: ['ignore', 'ignore', 'ignore'] })
      this.ready = 1
    } catch(err) {
      console.log(err.stack)
      this.ready = 2
    }
  }

  public async compile(filePath: string, compileArgs: string[] = paths.gccArgs) {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve: (value: CompileReturn) => void, reject: (value: CompileReturn) => void) => {
        if(this.ready === 1) {
        if(!path.isAbsolute(filePath)) {
          filePath = path.resolve(__dirname, filePath)
        }
        if(!fs.existsSync(paths.cacheTempPath)) {
          fs.mkdirSync(paths.cacheTempPath)
        }
        const fileName = filePath.split(/[\\/]/)[filePath.split(/[\\/]/).length - 1]
        const outputPath = path.resolve(paths.cacheTempPath, fileName.split('.')[0] + (paths.sysPlatform === 'win32' ? '.exe' : ''))
        console.log(cyan(`Ready to compile file \n\t\`${filePath}\` \nto \n\t\`${outputPath}\``))
        console.log(cyan('Compiling...'))
        const gccCmd = `${this.gccPath} -v -o "${outputPath}" ${compileArgs.join(' ')} "${filePath}"`
        execPromise(gccCmd)
          .then(() => {
            console.log(green.bold('Compile Success'))
            resolve({
              message: 'Compile Success',
              output: outputPath,
            })
            return
          })
          .catch(err => {
            console.log(red.bold('Compile Error'))
            console.error(err)
            reject({
              message: 'Compile Error',
            })
            return
          })
      } else {
        console.log('Compiler not ready yet')
        reject({
          message: 'Compiler not ready',
        })
        return
      }
    })
    
  }
}