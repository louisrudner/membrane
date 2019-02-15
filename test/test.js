const test = require('tape')
const membrane = require('../index')

const double = x => x * 2
const triple = x => x * 3

const a = membrane({
  x: 100,
  y: 101
})

const b = membrane({
  z: 102
})

const c = a.connect(b).lift('triple', triple)

test('Membrane returns correct types', assert => {
  assert.equal(typeof a.value(), 'object')
  assert.equal(typeof b.value(), 'object')
  assert.equal(typeof c.value(), 'object')
  assert.end()
})

test('Membrane map works correctly', assert => {
  const d = c.map(x => x * 2).map(x => x * 2)
  assert.equal(d.value()['x'], 400)
  assert.end()
})

test('Membrane lift works correctly', assert => {
  assert.equal(c.triple(7), 21)
  assert.end()
})

test('Membrane connect works correctly', assert => {
  assert.equal(a.connected().length, 1)
  assert.equal(a.connected()[0].value()['z'], 102)
  assert.end()
})

test('Membrane disconnect works correctly', assert => {
  assert.equal(a.disconnect(b).connected().length, 0)
  assert.equal(b.disconnect(a).connected().length, 0)
  assert.end()
})
