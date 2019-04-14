#!/usr/bin/env node
var docopt = require('docopt')
var fs = require('fs')
var meta = require('./package')
var path = require('path')
var usage = fs.readFileSync(path.join(__dirname, 'usage.txt'))
  .toString()
  .trim()

var options = docopt.docopt(usage, { version: meta.version })

var infoStrings = []
if (options['--no-info']) {
  infoStrings.push('')
}
if (options['--info']) {
  options['--info']
    .split(',')
    .forEach(function (infoString) {
      infoStrings.push(infoString)
    })
}

var bufferedInput = ''
var file = options['<file>']
var input = file ? fs.createReadStream(file) : process.stdin

input
  .on('data', function (buffer) {
    bufferedInput += buffer.toString()
  })
  .on('end', function () {
    console.log(
      require('defence')(
        bufferedInput,
        infoStrings.length > 0
          ? infoStrings
          : undefined
      )
    )
  })
