/// <reference types="node" />

declare module '@config/paths' {
  export = paths

  interface ojURL {
    [prop: string]: string
  }

  namespace paths {
    const sysPlatform: NodeJS.Platform
    const gccVersion: string
    const gccPath: string
    const appPath: string
    const ownPath: string
    const samplePath: string
    const codePath: string
    const cacheTempPath: string
    const gccArgs: string[]
    const ojURL: ojURL
  }
}