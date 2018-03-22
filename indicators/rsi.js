const { Transform } = require('stream')
const { RSI } = require('technicalindicators');

class RSIStream extends Transform {
  constructor({ period = 14, name = 'rsi' } = {}) {
    super({ objectMode: true })
    this.period = period;
    this.name = name;
    this.rsi = new RSI({ period: period, values : [] });
  }
  _transform(chunk, encoding, callback) {
    if (chunk){
      chunk[this.name] = this.rsi.nextValue(chunk.close)
    }
    callback(null, chunk)
  }
}

module.exports = RSIStream
