'use strict';

/* Dependencies. */
var fs = require('fs');
var dsv = require('d3-dsv');

/* Read. */
var doc = fs.readFileSync('data.txt', 'utf-8');

/* Transform. */
var map = {};

dsv.tsvParse(doc).forEach(function (row) {
  var chars = row.unicode.split('_').map(function (point) {
    return String.fromCharCode(parseInt(point, 16));
  });

  if (!chars.some(function (char) {
    return char.charCodeAt(0) >= 128;
  })) {
    return;
  }

  chars = chars.join('');

  if (chars !== row.glyph) {
    map[chars] = row.glyph;
  }
});

/* Write. */
fs.writeFileSync('index.json', JSON.stringify(map, 0, 2) + '\n');
