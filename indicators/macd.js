const { Transform } = require('stream')
const { MACD } = require('technicalindicators')

class MACDStream extends Transform {
  constructor({ fastPeriod = 5, slowPeriod = 8, signalPeriod = 3, name = 'macd' } = {}) {
    super({ objectMode: true })
    this.fastPeriod = fastPeriod
    this.slowPeriod = slowPeriod
    this.signalPeriod = signalPeriod
    this.name = name
    this.macd = new MACD({
      fastPeriod: fastPeriod,
      slowPeriod: slowPeriod,
      signalPeriod: signalPeriod,
      values : []
    })
  }
  _transform(chunk, encoding, callback) {
    chunk[this.name] = this.macd.nextValue(chunk.close)
    callback(null, chunk)
  }
}

module.exports = MACDStream
