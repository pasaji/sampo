const { Transform } = require('stream')
const { CCI } = require('technicalindicators');

class CCIStream extends Transform {
  constructor({ period = 20, name = 'cci' } = {}) {
    super({ objectMode: true })
    this.period = period;
    this.name = name;
    this.cci = new CCI({ period, open: [], high: [], low: [], close: [] })
  }
  _transform(chunk, encoding, callback) {
    chunk[this.name] = this.cci.nextValue({
      open: chunk.open,
      high: chunk.high,
      low: chunk.low,
      close: chunk.close
    })
    callback(null, chunk)
  }
}

module.exports = CCIStream
