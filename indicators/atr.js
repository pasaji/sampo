const { Transform } = require('stream')
const { ATR } = require('technicalindicators');

class ATRStream extends Transform {
  constructor({ period = 14, name = 'atr' } = {}) {
    super({ objectMode: true })
    this.period = period;
    this.name = name;
    this.atr = new ATR({ period, high : [], low:[], close:[] });
  }
  _transform(chunk, encoding, callback) {
    chunk[this.name] = this.atr.nextValue({
      high: chunk.high,
      low: chunk.low,
      close: chunk.close
    })
    callback(null, chunk)
  }
}

module.exports = ATRStream
