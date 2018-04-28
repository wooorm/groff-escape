'use strict'

if (parseInt(process.version.slice(1), 10) < 6) {
  console.warn('Cannot build on versions lower than Node@6')
  /* eslint-disable unicorn/no-process-exit */
  process.exit()
}

var fs = require('fs')
var path = require('path')
var http = require('http')
var tar = require('tar')
var concat = require('concat-stream')
var bail = require('bail')

http
  .request('http://ftp.gnu.org/gnu/groff/groff-1.22.3.tar.gz', onrequest)
  .end()

function onrequest(res) {
  res.pipe(tar.t()).on('entry', onentry)
}

function onentry(entry) {
  if (path.basename(entry.path) === 'uniglyph.cpp') {
    entry.pipe(concat(onconcat))
  }
}

function onconcat(body) {
  var map = {}
  var data = String(body)
    .split('\n')
    .filter(filter)
    .map(clean)
    .join('\n')

  JSON.parse('[' + data.slice(0, -1) + ']').forEach(parse)

  fs.writeFile('index.json', JSON.stringify(map, 0, 2) + '\n', bail)

  function parse(row) {
    var chars = row[0].split('_').map(toChar)

    if (chars.some(nonAscii)) {
      chars = chars.join('')

      if (chars !== row[1]) {
        map[chars] = row[1]
      }
    }
  }

  function nonAscii(char) {
    return char.charCodeAt(0) >= 128
  }

  function toChar(point) {
    return String.fromCharCode(parseInt(point, 16))
  }

  function filter(line) {
    var val = '  { "'
    return line.slice(0, val.length) === val
  }

  function clean(line) {
    return line
      .trim()
      .replace('{', '[')
      .replace('}', ']')
  }
}
