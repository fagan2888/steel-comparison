import 'babel-polyfill';

const footnote = 'Source: U.S. Department of Commerce, Enforcement and Compliance.  Includes content supplied by IHS Global Ltd.; Copyright © IHS Global, Ltd., 2018. All rights reserved.';
const monitor_link = 'https://www.trade.gov/steel/global-monitor.asp';
const faqs_link = 'https://www.trade.gov/steel/pdfs/faqs.pdf';

const config = Object.assign({
  development: {
    api: {
      steel: {
        host: 'http://127.0.0.1:3000/v1/steel_data/search',
        apiKey: 'devkey'
      }
    },
    monitor_link: monitor_link,
    footnote: footnote,
    faqs_link: faqs_link
  },
  test: {
    api: {
      steel: {
        host: 'http://127.0.0.1:3000/v1/steel_data/search',
        apiKey: 'devkey'
      }
    },
    monitor_link: monitor_link,
    footnote: footnote,
    faqs_link: faqs_link
  },
  production: {
    api: {
      steel: {
        host: 'https://api.trade.gov/v1/steel_data/search',
        apiKey: 'O6fmOIPtrvDlqoDe2_6UbKJc'
      }
    },
    monitor_link: monitor_link,
    footnote: footnote,
    faqs_link: faqs_link
  }
});

export default config[process.env.NODE_ENV];