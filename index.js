const config = require('./config')
const Sampo = require('./core/sampo')
const { now, WEEK } = require('./utils/time-utils')

const sampo = new Sampo(config)
// sampo.start()
sampo.backtest ({ start: now() - WEEK, duration: WEEK }, () => {
  console.log('Backtest Done!');
})
