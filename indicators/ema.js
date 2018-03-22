const { Transform } = require('stream')
const { EMA } = require('technicalindicators');

class EMAStream extends Transform {
  constructor({ period = 21, name = 'ema' } = {}) {
    super({ objectMode: true })
    this.period = period;
    this.name = name;
    this.ema = new EMA({ period: period, values : [] });
  }
  _transform(chunk, encoding, callback) {
    chunk[this.name] = this.ema.nextValue(chunk.close)
    callback(null, chunk)
  }
}

module.exports = EMAStream
