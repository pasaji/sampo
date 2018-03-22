const { Transform } = require('stream')
const { ADX } = require('technicalindicators');

class ADXStream extends Transform {
  constructor({ period = 14, name = 'adx' } = {}) {
    super({ objectMode: true })
    this.period = period;
    this.name = name;
    this.adx = new ADX({ period, high : [], low:[], close:[] })
  }
  _transform(chunk, encoding, callback) {
    chunk[this.name] = this.adx.nextValue({
      high: chunk.high,
      low: chunk.low,
      close: chunk.close
    })
    callback(null, chunk)
  }
}

module.exports = ADXStream
