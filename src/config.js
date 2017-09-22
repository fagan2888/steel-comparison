import 'babel-polyfill';

const footnote = "Source: Annual data from UN Comtrade, Desa/UNSD; YTD data from HIS Global Trade Atlas sourced from the reporting country's official statistics.";
const monitor_link = 'http://trade.gov/steel/global-monitor.asp';

const config = Object.assign({
  development: {
    api: {
      steel: {
        host: 'http://127.0.0.1:3000/v1/steel_data/search',
        apiKey: 'devkey',
      },
    },
    monitor_link: monitor_link,
    footnote: footnote
  },
  test: {
    api: {
      steel: {
        host: 'http://127.0.0.1:3000/v1/steel_data/search',
        apiKey: 'devkey',
      },
    },
    monitor_link: monitor_link,
    footnote: footnote
  },
  production: {
    api: {
      steel: {
        host: 'https://api.trade.gov/v1/steel_data/search',
        apiKey: 'O6fmOIPtrvDlqoDe2_6UbKJc',
      },
    },
    monitor_link: monitor_link,
    footnote: footnote
  },
});

export default config[process.env.NODE_ENV];