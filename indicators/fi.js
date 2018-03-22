const { Transform } = require('stream')
const { ForceIndex } = require('technicalindicators');

class FIStream extends Transform {
  constructor({ name = 'fi' } = {}) {
    super({ objectMode: true })
    this.name = name;
    this.fi = new ForceIndex({ open: [], high: [], low: [], close: [], volume: [] })
  }
  _transform(chunk, encoding, callback) {
    chunk[this.name] = this.fi.nextValue({
      open: chunk.open,
      close: chunk.close,
      high: chunk.high,
      low: chunk.low,
      volume: chunk.volume
    })
    callback(null, chunk)
  }
}

module.exports = FIStream
