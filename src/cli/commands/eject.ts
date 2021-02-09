/** 
 * Write as facebook/create-react-app
*/
process.on('unhandledRejection', err => {
  throw err
})

import * as fs from 'fs-extra'
import * as path from 'path'
import { prompt } from 'inquirer'
import * as paths from '../../../config/paths'
import { cyan, green } from 'chalk'

prompt({
  type: 'confirm',
  name: 'shouldEject',
  message: 'Are you sure you want to eject? This action can be reversed.',
  default: false,
}).then(answer => {
  if(!answer.shouldEject) {
    console.log(cyan('Eject aborted.'))
    return
  }

  console.log('Ejecting...')

  const appPath = paths.appPath

  if(fs.existsSync(path.join(appPath, 'judger.config.json'))) {
    console.error(
      '`judger.config.json` already exists in your app folder. We cannot ' +
      'continue as you would lose all the changes in that file or directory. ' +
      'Please move or delete it (maybe make a copy for backup) and run this ' +
      'command again.'
    )
    process.exit(1)  
  }

  const outputJson = {
    gccPath: paths.gccPath,
    gccArgs: paths.gccArgs,
    ojURL: paths.ojURL,
    appPath: paths.appPath,
    cacheTempPath: paths.cacheTempPath,
    samplePath: paths.samplePath,
    codePath: paths.codePath,
  }

  fs.writeFileSync(path.join(appPath, 'judger.config.json'), JSON.stringify(outputJson, null, 2))

  console.log(green('Ejected successfully!'))
  console.log()

})