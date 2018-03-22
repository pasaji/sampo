exports.MINUTE     = 1000 * 60 // ms
exports.HOUR       = 1000 * 60 * 60 // ms
exports.DAY        = 1000 * 60 * 60 * 24 // ms
exports.WEEK       = 1000 * 60 * 60 * 24 * 7 // ms

exports.timeframes = {
  '1m': exports.MINUTE,
  '5m': exports.MINUTE * 5,
  '15m': exports.MINUTE * 15,
  '30m': exports.MINUTE * 30,
  '1h': exports.HOUR,
  '2h': exports.HOUR * 2
}

exports.now = () => {
  return new Date().getTime()
}

exports.timer = ({ loop = true, interval = 1000 }) => {
  let intervalId
  return {
    start: (cb) => {
      if (!intervalId) {
        clearInterval(intervalId)
      }
      intervalId = setInterval(() => {
        cb(now())
      }, interval)
    },
    stop: () => {
      clearInterval(intervalId)
    }
  }
}
