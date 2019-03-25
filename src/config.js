const footnote = 'Source: U.S. Department of Commerce, Enforcement and Compliance.  Includes content supplied by IHS Global Ltd.; Copyright © IHS Global, Ltd., 2018. All rights reserved.';
const monitor_link = 'https://www.trade.gov/steel/global-monitor.asp';
const faqs_link = 'https://www.trade.gov/steel/pdfs/faqs.pdf';

const config = Object.assign({
  endpoints: {
    development: {
      api: {
        steel: {
          host: 'https://api.trade.gov/v1/steel_data/search',
          apiKey: 'hQ4L7ylI9POH3QuqxOY_l2UC'
        }
      }
    },
    test: {
      api: {
        steel: {
          host: 'http://127.0.0.1:3000/v1/steel_data/search',
          apiKey: 'devkey'
        }
      }
    },
    production: {
      api: {
        steel: {
          host: 'https://api.trade.gov/v1/steel_data/search',
          apiKey: 'hQ4L7ylI9POH3QuqxOY_l2UC'
        }
      }
    },
    staging: {
      api: {
        steel: {
          host: 'https://api.trade.gov/v1/steel_data_staging/search',
          apiKey: 'FGjwxfSkdeVB2GncULww_uFb'
        }
      }
    }
  },
  monitor_link: monitor_link,
  footnote: footnote,
  faqs_link: faqs_link,
  instructions: {
    "Reporting Countries": "Select a Trade Flow, two Reporting Countries, a Partner Country, and Quantity or Value. Click Generate Dashboard to update the graph and downloadable data.",
    "Partner Countries": "Select a Trade Flow, a Reporting Country, two Partner Countries, and Quantity or Value. Click Generate Dashboard to update the graph and downloadable data.",
    "Product Groups": "Select a Trade Flow, a Reporting Country, a Partner Country, two Product Groups, and Quantity or Value. Click Generate Dashboard to update the graph and downloadable data.",
    "Trade Flows": "Select a Reporting Country, a Partner Country, and Quantity or Value. Click Generate Dashboard to update the graph and downloadable data.",
  }
});

export default config;
