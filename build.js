/**
 * @typedef {import('tar').ReadEntry} ReadEntry
 */

import fs from 'node:fs'
import path from 'node:path'
import https from 'node:https'
import tar from 'tar'
import concatStream from 'concat-stream'
import {bail} from 'bail'

// To update, see <https://ftp.gnu.org/gnu/groff/> if there are newer versions.
https
  .request('https://ftp.gnu.org/gnu/groff/groff-1.22.4.tar.gz', (response) => {
    response.pipe(tar.t()).on('entry', (/** @type {ReadEntry} */ entry) => {
      if (path.basename(entry.path) === 'uniglyph.cpp') {
        entry.pipe(
          concatStream((body) => {
            /** @type {Record<string, string>} */
            const map = {}
            const prefix = '  { "'
            const data = String(body)
              .split('\n')
              .filter((line) => line.slice(0, prefix.length) === prefix)
              .map((line) => line.trim().replace('{', '[').replace('}', ']'))
              .join('\n')
            /** @type {Array<[string, string]>} */
            const list = JSON.parse('[' + data.slice(0, -1) + ']')
            let index = -1

            while (++index < list.length) {
              const row = list[index]
              const characters = row[0]
                .split('_')
                .map((point) => String.fromCharCode(Number.parseInt(point, 16)))

              if (characters.some((char) => char.charCodeAt(0) >= 128)) {
                const value = characters.join('')

                if (value !== row[1]) {
                  map[value] = row[1]
                }
              }
            }

            fs.writeFile(
              'index.js',
              [
                '/**',
                ' * Map of non-ASCII characters to Groff commands.',
                ' *',
                ' * @type {Record<string, string>}',
                ' */',
                'export const groffEscape = ' + JSON.stringify(map, null, 2),
                ''
              ].join('\n'),
              bail
            )
          })
        )
      }
    })
  })
  .end()
