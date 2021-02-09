const childProcess = require('child_process')
const fs = require('fs')
const path = require('path')

const GCCVersionReg = /gcc[ ]version[ ](\d+(?:\.\d+(?:\.\d+)))/i
const GCCPathReg = /COLLECT_LTO_WRAPPER=([-\w\\/ :\.]+?\/bin)/i

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = reletivePath => path.resolve(appDirectory, reletivePath)
const sysPlatform = process.platform

const checkGCC = type => {
  try {
    const res = childProcess.spawnSync('gcc', ['-v']).stderr.toString()
    switch(type) {
      case 'path': {
        if(GCCPathReg.test(res)) {
          const tmp = path.join(res.match(GCCPathReg)[1], sysPlatform === 'win32' ? 'gcc.exe' : 'gcc').replace(/[\\\/] /g, ' ')
          console.log(111, tmp, fs.existsSync(tmp))
          if(fs.existsSync(tmp)) {
            return tmp
          }
          return undefined
        } else {
          return undefined
        }
      }
      case 'version': {
        return res.match(GCCVersionReg)[1]
      }
      default: return undefined
    }
  } catch (err) {
    console.log(err.status)
    return undefined
  }
}

const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath)
let customConfigOverride

if(fs.existsSync(path.join(resolveApp('.'), 'judger.config.json'))) {
  customConfigOverride = JSON.parse(fs.readFileSync(path.join(resolveApp('.'), 'judger.config.json'), 'utf-8'))
}

module.exports = {
  sysPlatform,
  gccVersion: checkGCC('version'),
  gccPath: checkGCC('path'),
  appPath: resolveApp('.'),
  ownPath: resolveOwn('.'),
  samplePath: resolveApp('./sample'),
  codePath: resolveApp('./code'),
  cacheTempPath: resolveApp('./temp'),
  gccArgs: '-o',
  ojURL: {
    luogu: 'https://www.luogu.com.cn'
  },
  ...customConfigOverride,
}