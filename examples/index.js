const membrane = require('../index')

const a = membrane({ a: 10 })
const b = membrane({ b: 20 })
const c = membrane({ c: 30 })
const d = a.connect(b).connect(c)

const e = d.disconnect(a)

console.log(e.value())
