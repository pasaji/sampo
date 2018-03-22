const { Writable, Readable, Transform } = require('stream')
const hash = require('object-hash')

class Store {
  constructor({ config, api }) {
    console.log('new Store');
    this.config = config
    this.api = api
    this.spotters = []
    this.openCases = []
    this.closedCases = []
    this.streams = {}
  }

  readStream(options) {
    const streamId = hash(options)
    if (!this.streams.hasOwnProperty(streamId)) {
      console.log('new store stream', streamId);
      const { type, exchange, market, timeframe, indicators, historySize } = options
      const apiStream = this.api.readStream({ type, exchange, market, timeframe, historySize })
      this.streams[streamId] = new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
          // TODO: capture data ???
          // console.log(streamId, chunk);
          callback(null, chunk);
        }
      })

      let last = apiStream

      // add indicators
      if (indicators && indicators.length) {
        indicators.forEach(indicator => {
          const I = require('../indicators/' + indicator.id)
          const i = new I(indicator)
          last.pipe(i)
          last = i
        })
      }

      last.pipe(this.streams[streamId])
    }

    return this.streams[streamId]
  }

  addSpotter (spotter) {
    this.spotters.push(spotter)
  }

  openCase (item) {
    this.openCases.push(item)
  }

  closeCase (item) {
    const index = this.openCases.indexOf(item)
    if (index > -1) {
      this.openCases.splice(index, 1)
    }
    this.closedCases.push(item)
  }

  getState() {
    return {

    }
  }
}
module.exports = Store
