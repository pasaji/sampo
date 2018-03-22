module.exports = {
  keychain: { poloniex: {} },
  strategies: [
    {
      strategy: 'rsi',
      exchange: 'poloniex',
      market: 'LTC/USDT',
      requirements: [
        // default market
        {
          type: 'ohlcv',
          timeframe: '30m',
          historySize: 21,
          indicators: [
            { id: 'ema', period: 9, name: 'ema9' },
            { id: 'ema', period: 21, name: 'ema21' },
            { id: 'rsi', period: 14 },
            { id: 'cycle' }
          ]
        },
        {
          type: 'ohlcv',
          timeframe: '5m',
          exchange: 'poloniex',
          market: 'BTC/USDT',
          historySize: 21,
          indicators: [
            { id: 'ema', period: 9, name: 'ema9' },
            { id: 'ema', period: 21, name: 'ema21' },
            { id: 'rsi', period: 14 }
          ]
        }
      ]
    }
  ]
}
