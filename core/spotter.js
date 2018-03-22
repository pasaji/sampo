const { Writable } = require('stream')

class Spotter {
  constructor ({ store, exchange, market, requirements, Case }) {
    console.log('*Spotter');
    this.store = store
    this.exchange = exchange
    this.market = market
    this.requirements = requirements
    this.Case = Case

    this.openCases = []
    this.closedCases = []

    this.streams = []
    this.store.addSpotter(this)

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

  openCase () {
    const item = new this.Case({ store: this.store, exchange: this.exchange, market: this.market, requirements: this.requirements, spotter: this })
    this.openCases.push(item)
  }

  closeCase (item) {
    const index = this.openCases.indexOf(item)
    if (index > -1) {
      this.openCases.splice(index, 1)
      this.closedCases.push(item)
    }
  }

  // overide this
  check(data, definition, callback) {
    console.log({ data, definition, callback })
    callback()
  }
}
module.exports = Spotter
