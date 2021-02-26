const membrane = require('./index')

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

test('Membrane returns correct types', () => {
  expect(typeof a.value()).toBe('object')
  expect(typeof b.value()).toBe('object')
  expect(typeof c.value()).toBe('object')
})

test('Membrane map works correctly', () => {
  const d = c.map(x => x * 2).map(x => x * 2)
  expect(d.value()['x']).toBe(400)
})

test('Membrane lift works correctly', () => {
  expect(c.triple(7)).toBe(21)
})

test('Membrane connect works correctly', () => {
  expect(a.connected().length).toBe(1)
  expect(a.connected()[0].value()['z']).toBe(102)
})

test('Membrane disconnect works correctly', () => {
  expect(a.disconnect(b).connected().length).toBe(0)
  expect(b.disconnect(a).connected().length).toBe(0)
})
