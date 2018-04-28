'use strict';

var test = require('tape');
var escape = require('.');

test('groff-escape', function (t) {
  [
    ['π', '*p'],
    ['✓', 'OK'],
    ['∧', 'AN']
  ].forEach(function (fixture) {
    t.equal(escape[fixture[0]], fixture[1], fixture[0]);
  });

  t.end();
});
