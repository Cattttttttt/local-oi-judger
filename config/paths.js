// @remove-on-eject-begin
/**
 * Write like facebook/create-react-app
 */
// @remove-on-eject-end
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

// config after eject: we're in ./config/
module.exports = {
  sysPlatform,
  gccVersion: checkGCC('version'),
  gccPath: checkGCC('path'),
  appPath: resolveApp('.'),
  appPackageJson: resolveApp('package.json'),
  appYarnLockFile: resolveApp('yarn.lock'),
  appNodeModules: resolveApp('node_modules'),
}

// @remove-on-eject-begin
const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath)

// config before eject: we're in ./node_modules/package_name/config/
module.exports = {
  sysPlatform,
  gccVersion: checkGCC('version'),
  gccPath: checkGCC('path'),
  appPath: resolveApp('.'),
  appPackageJson: resolveApp('package.json'),
  appYarnLockFile: resolveApp('yarn.lock'),
  appNodeModules: resolveApp('node_modules'),
  // These properties only exist before ejecting
  ownPath: resolveOwn('.'),
  ownNodeModules: resolveOwn('node_modules')
}

// @remove-on-eject-end