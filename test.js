import test from 'tape'
import {groffEscape} from './index.js'

test('groffEscape', function (t) {
  t.equal(groffEscape['π'], '*p', 'π')
  t.equal(groffEscape['✓'], 'OK', '✓')
  t.equal(groffEscape['∧'], 'AN', '∧')

  t.end()
})
