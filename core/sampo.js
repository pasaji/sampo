const ExchangeAPI = require('./exchange-api')
const Store = require('./store')
const Trader = require('./trader')
const PaperTrader = require('./paper-trader')

class Sampo {

  constructor(config) {
    this.config = config
    this.api = new ExchangeAPI({ config })
    this.store = new Store({ config, api: this.api })
    this.trader = new Trader({ config, store: this.store, api: this.api })
    this.paperTrader = new PaperTrader({ config, store: this.store })
    this.configure()
  }

  configure () {
    this.createSpotters()
  }

  start() {
    // start exchange api
  }

  backtest ({ start, duration }, callback) {
    // callback is called when all data has been sent
    this.api.backtest({ start, duration }, callback)
  }

  optimize ({ start, duration }, callback) {
    // callback is called when all data has been sent
  }

  stop() {
    // ???
  }

  createSpotters () {
    this.config.strategies.forEach(settings => {
      const { strategy, exchange, market, requirements } = settings
      const { Spotter, Case } = require('../strategies/' + strategy)
      const spotter = new Spotter({ store: this.store, exchange, market, requirements, Case })
    })
  }

  getState() {
    return this.store.getState()
  }
}

module.exports = Sampo
