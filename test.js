var exec = require('child_process').execSync
var fs = require('fs')
var path = require('path')
var tape = require('tape')

function runCommand(input, args) {
  return exec('./defence', args).toString() }

tape('JavaScript only', function(test) {
  var markdown = fs.realpathSync('examples/input.md')
  require('glob').sync('examples/*.output')
    .forEach(function(outputFile) {
      var flags = require('./' + outputFile.replace('.output', '.json'))
      var output = fs.readFileSync(outputFile).toString()
      test.equal(
        exec(
          [ './defence' ]
            .concat(flags)
            .concat(markdown)
            .join(' '))
          .toString(),
        output,
        path.basename(outputFile, '.output')) })
  test.end() })
