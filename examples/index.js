const membrane = require('../index')

const double = (x) => x * 2

const a = membrane({ a: 10 })
const b = membrane({ b: 20 })
const c = membrane({ c: 30 })
const d = a.connect(b).connect(c)

const e = d.disconnect(a)
const f = e.lift('double', double)

console.log(f.value());
console.log(f.double(f.value().b))

