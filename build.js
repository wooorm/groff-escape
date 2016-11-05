'use strict';

/* eslint-disable max-nested-callbacks */

/* Dependencies. */
var fs = require('fs');
var path = require('path');
var http = require('http');
var zlib = require('zlib');
var tar = require('tar');
var concat = require('concat-stream');
var bail = require('bail');

/* Core. */
http
  .request('http://ftp.gnu.org/gnu/groff/groff-1.22.3.tar.gz', function (res) {
    res
      .pipe(new zlib.Unzip())
      .pipe(new tar.Parse())
      .on('entry', function (entry) {
        if (path.basename(entry.path) !== 'uniglyph.cpp') {
          return;
        }

        entry.pipe(concat(function (body) {
          var map = {};
          var data;

          data = String(body)
            .split('\n')
            .filter(function (line) {
              var val = '  { "';
              return line.slice(0, val.length) === val;
            })
            .map(function (line) {
              return line.trim().replace('{', '[').replace('}', ']');
            })
            .join('\n');

          data = JSON.parse('[' + data.slice(0, -1) + ']');

          data.forEach(function (row) {
            var chars = row[0].split('_').map(function (point) {
              return String.fromCharCode(parseInt(point, 16));
            });

            if (!chars.some(function (char) {
              return char.charCodeAt(0) >= 128;
            })) {
              return;
            }

            chars = chars.join('');

            if (chars !== row[1]) {
              map[chars] = row[1];
            }
          });

          /* Write. */
          fs.writeFile('index.json', JSON.stringify(map, 0, 2) + '\n', bail);
        }));
      });
  })
  .end();
