'use strict'

var test = require('tape')
var escape = require('.')

test('groff-escape', function(t) {
  var fixtures = [
    ['π', '*p'],
    ['✓', 'OK'],
    ['∧', 'AN']
  ]

  fixtures.forEach(function(fixture) {
    t.equal(escape[fixture[0]], fixture[1], fixture[0])
  })

  t.end()
})
