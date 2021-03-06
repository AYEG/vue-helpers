#!/usr/bin/env node
const path = require('path')
const rawArgv = process.argv.slice(2)
const command = rawArgv[0]
switch (command) {
  case 'tslint':
    require('@vue/cli-plugin-typescript/lib/tslint')(rawArgv, path, false)
    break
  default:
    throw new Error(`Invalid command ${command}.`)
}
