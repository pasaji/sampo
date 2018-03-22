const ccxt = require('ccxt')
const { Writable, Readable, Transform } = require('stream')
const hash = require('object-hash')
const async = require('async')
const CandleCollection = require('./candle-collection')

class ExchangeAPI {
  constructor(config) {
    console.log('new ExchangeAPI');
    this.exchanges = {}
    this.streams = {}
    this.streamSettings = []
  }

  start () {
    // loads market history (historySize)
    // start realtime polling
  }

  backtest ( { start, duration }, callback ) {
    const collection = new CandleCollection()
    const queue = async.queue((settings, cb) => {
      // TODO: sleep: 1 queue per second
      const streamId = hash(settings)
      const { exchange, market, timeframe, historySize } = settings
      this.fetchOHLCV( { exchange, market, timeframe, since: start, limit: 99999 }, (err, result) => {
        if (err) {
          return cb(err)
        }
        collection.push(streamId, result)
        cb()
      })
    }, 1)
    queue.drain = () => {
      let item = collection.next()
      while (item) {
        const { id, data } = item
        this.streams[id].push(data)
        item = collection.next()
      }
    }
    this.streamSettings.forEach(settings => {
      queue.push(settings)
    })
  }

  readStream(settings) {
    const streamId = hash(settings)
    if (!this.streams.hasOwnProperty(streamId)) {
      this.streamSettings.push(settings)
      this.streams[streamId] = new Readable({
        objectMode: true,
        read(size) {}
      })
    }
    return this.streams[streamId]
  }

  getExchange ( id ) {
    if ( !this.exchanges.hasOwnProperty( id ) ) {
      this.exchanges[ id ] = new ccxt[ id ]({ 'timeout': 30000 })
    }
    return this.exchanges[ id ]
  }

  fetchOHLCV({ exchange, market, timeframe, since, limit, params = {} }, cb) {
    const e = this.getExchange( exchange )
    e.fetchOHLCV(market, timeframe, since, limit, params).then((result) => {
      cb(null, result.map((item, index) => {
        return { date: item[0], open: item[1], high: item[2], low: item[3], close: item[4], volume: item[5] }
      }))
    }, cb)
  }
}
module.exports = ExchangeAPI
