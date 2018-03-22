const { Writable } = require('stream')

class Case {
  constructor ({ store, exchange, market, requirements, spotter }) {
    this.store = store
    this.exchange = exchange
    this.market = market
    this.requirements = requirements
    this.spotter = spotter
    this.streams = []

    this.store.openCase(this)

    this.connect()
  }

  connect () {
    const self = this
    this.requirements.forEach(requirement => {
      const rs = this.store.readStream({ exchange: this.exchange, market: this.market, ...requirement })
      const ws = new Writable({
        objectMode: true,
        write(chunk, encoding, callback) {
          self.check(chunk, requirement, callback)
        }
      })
      rs.pipe(ws)
      self.streams.push({ rs, ws })
    })
  }

  disconnect () {
    while (this.streams.length) {
      const { rs, ws } = this.streams.pop()
      rs.unpipe(ws)
      ws.end()
    }
  }

  close () {
    this.spotter.closeCase(this)
    this.store.closeCase(this)
    this.disconnect()
  }

  // overide this
  check(data, definition, callback) {
    console.log({ data, definition, callback })
    callback()
  }
}
module.exports = Case
