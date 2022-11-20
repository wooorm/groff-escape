import assert from 'node:assert/strict'
import test from 'node:test'
import {groffEscape} from './index.js'

test('groffEscape', function () {
  assert.equal(groffEscape['π'], '*p', 'π')
  assert.equal(groffEscape['✓'], 'OK', '✓')
  assert.equal(groffEscape['∧'], 'AN', '∧')
})
