/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module groff-escape
 * @fileoverview Test suite for `groff-escape`.
 */

'use strict';

/* Dependencies. */
var test = require('tape');
var escape = require('./');

/* Tests. */
test('groff-escape', function (t) {
  var fixture = {'π': '*p', '✓': 'OK', '∧': 'AN'};

  Object.keys(fixture).forEach(function (u) {
    t.equal(escape[u], fixture[u], u);
  });

  t.end();
});
