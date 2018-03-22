const { Transform } = require('stream')
const { VWAP } = require('technicalindicators');

class VWAPStream extends Transform {
  constructor({ name = 'vwap' } = {}) {
    super({ objectMode: true })
    this.name = name;
    this.vwap = new VWAP({ open: [], high: [], low: [], close: [], volume: [] })
  }
  _transform(chunk, encoding, callback) {
    chunk[this.name] = this.vwap.nextValue({
      open: chunk.open,
      close: chunk.close,
      high: chunk.high,
      low: chunk.low,
      volume: chunk.volume
    })
    callback(null, chunk)
  }
}

module.exports = VWAPStream
