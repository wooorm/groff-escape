import fs from 'node:fs'
import path from 'node:path'
import https from 'node:https'
import tar from 'tar'
import concat from 'concat-stream'
import {bail} from 'bail'

// To update, see <https://ftp.gnu.org/gnu/groff/> if there are newer versions.
https
  .request('https://ftp.gnu.org/gnu/groff/groff-1.22.4.tar.gz', onrequest)
  .end()

function onrequest(response) {
  response.pipe(tar.t()).on('entry', onentry)
}

function onentry(entry) {
  if (path.basename(entry.path) === 'uniglyph.cpp') {
    entry.pipe(concat(onconcat))
  }
}

function onconcat(body) {
  var map = {}
  var prefix = '  { "'
  var data = String(body)
    .split('\n')
    .filter((line) => line.slice(0, prefix.length) === prefix)
    .map((line) => line.trim().replace('{', '[').replace('}', ']'))
    .join('\n')
  var list = JSON.parse('[' + data.slice(0, -1) + ']')
  var index = -1
  var row
  var chars

  while (++index < list.length) {
    row = list[index]
    chars = row[0]
      .split('_')
      .map((point) => String.fromCharCode(Number.parseInt(point, 16)))

    if (chars.some((char) => char.charCodeAt(0) >= 128)) {
      chars = chars.join('')

      if (chars !== row[1]) {
        map[chars] = row[1]
      }
    }
  }

  fs.writeFile(
    'index.js',
    'export var groffEscape = ' + JSON.stringify(map, null, 2) + '\n',
    bail
  )
}
