# Membrane

Dynamically connected JS objects.

## Example

```javascript
const a = membrane({ a: 10 })
const b = membrane({ b: 20 })
const c = membrane({ c: 30 })
const d = a.connect(b).connect(c)

const e = d.disconnect(a)

console.log(e.value())
//> { b: 20, c: 30 }
```
