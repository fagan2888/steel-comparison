import 'babel-polyfill';

const config = Object.assign({
  development: {
    api: {
      steel: {
        host: 'http://127.0.0.1:3000/v1/steel_data/search',
        apiKey: 'devkey',
      },
    },
    monitor_link: 'http://trade.gov/steel/global-monitor.asp'
  },
  test: {
    api: {
      steel: {
        host: 'http://127.0.0.1:3000/v1/steel_data/search',
        apiKey: 'devkey',
      },
    },
    monitor_link: 'http://trade.gov/steel/global-monitor.asp'
  },
  production: {
    api: {
      steel: {
        host: 'https://api.trade.gov/v1/steel_data/search',
        apiKey: 'O6fmOIPtrvDlqoDe2_6UbKJc',
      },
    },
    monitor_link: 'http://trade.gov/steel/global-monitor.asp'
  },
});

export default config[process.env.NODE_ENV];