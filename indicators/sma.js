const { Transform } = require('stream')
const { SMA } = require('technicalindicators');

class SMAStream extends Transform {
  constructor({ period = 50, name = 'sma' } = {}) {
    super({ objectMode: true })
    this.period = period;
    this.name = name;
    this.sma = new SMA({ period: period, values : [] });
  }
  _transform(chunk, encoding, callback) {
    chunk[this.name] = this.sma.nextValue(chunk.close)
    callback(null, chunk)
  }
}

module.exports = SMAStream
