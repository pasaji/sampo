const { Transform } = require('stream')
const { BollingerBands } = require('technicalindicators');

class BBStream extends Transform {
  constructor({ period = 14, stdDev = 2, name = 'bb' } = {}) {
    super({ objectMode: true })
    this.period = period;
    this.stdDev = stdDev;
    this.name = name;
    this.bb = new BollingerBands({ period, stdDev, values : [] });
  }
  _transform(chunk, encoding, callback) {
    chunk[this.name] = this.bb.nextValue(chunk.close)
    callback(null, chunk)
  }
}

module.exports = BBStream
