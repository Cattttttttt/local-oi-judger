import * as fs from 'fs'
import { cyan, red } from 'chalk'

import * as paths from '@config/paths'

export class Judger {

  public fileName: string
  public filePath: string

  constructor(execPath: string) {
    this.filePath = execPath
    if(!fs.existsSync(execPath)) {
      console.log(red.bold(`No file \`${execPath}\` exist! Please check your temp folder.`))
    }
    this.fileName = execPath.split(/[\\/]/)[execPath.split(/[\\/]/).length - 1].split('.')[0]
    this.initJudger()
  }

  private initJudger() {
    if(paths.sysPlatform === 'win32' && this.filePath.endsWith('.exe')) {
      console.log(cyan(`Judger linked to file \`${this.filePath}\`\nRunning on win32`))
    } else if(paths.sysPlatform !== 'win32') {
      try {
        fs.accessSync(this.filePath, fs.constants.X_OK)
        console.log(cyan(`Judger linked to file \`${this.filePath}\`\nRunning on ${paths.sysPlatform}`))
      } catch {
        console.log(red.bold(`Link failed! File \`${this.filePath}\` can not be executed.`))
      }
    }
  }

  public test() {
    console.log(this.filePath)
    console.log(this.fileName)
  }
}