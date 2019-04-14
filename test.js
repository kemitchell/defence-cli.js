var exec = require('child_process').exec
var assert = require('assert')
var fs = require('fs')
var path = require('path')

var markdown = fs.realpathSync('examples/input.md')

require('glob')
  .sync('examples/*.output')
  .forEach(function (outputFile) {
    var flags = require('./' + outputFile.replace('.output', '.json'))
    var output = fs.readFileSync(outputFile).toString()
    var command = ['./bin.js']
      .concat(flags)
      .concat(markdown)
      .join(' ')
    exec(command, function (error, stdout, stderr) {
      assert.ifError(error)
      assert.strictEqual(
        stdout.toString(),
        output,
        path.basename(outputFile, '.output')
      )
    })
  })
