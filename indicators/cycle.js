const { Transform } = require('stream')
//
class EMAStream extends Transform {
  constructor({ sensitivity = 2, period = 21, name = 'cycle' } = {}) {
    super({ objectMode: true })
    this.period = period;
    this.name = name;
  }

  _transform(chunk, encoding, callback) {
    chunk[this.name] = {
      frequency: undefined, // avg
      dynamics: undefined, // (rise+fall)/2
      riseTime: undefined,
      fallTime: undefined,
      riseLevel: undefined,
      fallLevel: undefined,
      top: undefined, // last top
      bottom: undefined // last bottom
    }
    callback(null, chunk)
  }
}

module.exports = EMAStream
