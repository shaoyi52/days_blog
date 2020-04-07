var  chalk = require('chalk')
var semver = require('semver')
//var packageConfig = require('../package.json')
var shell = require('shell.js')

function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()//child_process.exec(command[, options], callback)
}
