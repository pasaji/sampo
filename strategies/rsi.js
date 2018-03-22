const Spotter = require('../core/Spotter')
const Case = require('../core/Case')

let caseCount = 0

class RSISpotter extends Spotter {
  constructor (options) {
    super(options)
  }

  check(data, definition, callback) {
    const { type, exchange, market } = definition
    if ( type === 'ohlcv' && !this.openCases.length ) {
      if ( data.rsi < 30 ) {
        console.log('oversold', data);
        this.openCase()
      }
    }
    callback()
  }
}

class RSICase extends Case {
  constructor(options) {
    super(options)
    console.log('RSICase nr.', caseCount++)
  }

  check(data, definition, callback) {
    const { type, exchange, market } = definition
    if ( type === 'ohlcv' ) {
      if ( data.rsi > 30 ) {
        // close
        console.log('BUY', data);
        this.close()
      }
    }
    callback()
  }
}

exports.Spotter = RSISpotter
exports.Case = RSICase
