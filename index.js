const membrane = input => {
  const store = {
    ...input
  }
  const connected = []
  const controller = output => ({
    connected: () => connected,
    value: () => store,
    connect: (external, internal = false) => {
      connected.push(external)
      return !internal
        ? membrane({
            ...store,
            ...external.connect(membrane(input), true).value()
          })
        : membrane({ ...store, ...external.value() })
    },
    disconnect: external => {
      const key = Object.keys(external.value())[0]
      delete store[key]
      return membrane(store)
    },
    map: fn => {
      const obj = {}
      Object.keys(store).map(x => (obj[x] = fn(store[x])))
      return membrane(obj)
    },
    lift: (name, fn) => {
      const newController = controller(input)
      newController[name] = fn
      return newController
    }
  })
  return controller(input)
}

module.exports = membrane
