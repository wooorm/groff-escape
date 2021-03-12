'use strict'

var test = require('tape')
var escape = require('.')

test('groff-escape', function (t) {
  t.equal(escape['π'], '*p', 'π')
  t.equal(escape['✓'], 'OK', '✓')
  t.equal(escape['∧'], 'AN', '∧')

  t.end()
})
