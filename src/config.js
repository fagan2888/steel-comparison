const footnote = 'Source: U.S. Department of Commerce, Enforcement and Compliance.  Includes content supplied by IHS Global Ltd.; Copyright © IHS Global, Ltd. All rights reserved.';
const monitor_link = 'https://www.trade.gov/steel/global-monitor.asp';
const GSTM_link = 'https://beta.trade.gov/gstm';
const faqs_link = 'https://www.trade.gov/steel/pdfs/faqs.pdf';
const accessToken = 'b19262a5-9372-3204-8289-268d082428af';

const config = Object.assign({
  monitor_link: monitor_link,
  GSTM_link: GSTM_link,
  footnote: footnote,
  faqs_link: faqs_link,
  accessToken: accessToken,
  instructions: {
    "Reporting Countries": "select a Trade Flow, two Reporting Countries, a Partner Country, and Quantity or Value. Click Generate Dashboard to update the graph and downloadable data.",
    "Partner Countries": "select a Trade Flow, a Reporting Country, two Partner Countries, and Quantity or Value. Click Generate Dashboard to update the graph and downloadable data.",
    "Product Groups": "select a Trade Flow, a Reporting Country, a Partner Country, two Product Groups, and Quantity or Value. Click Generate Dashboard to update the graph and downloadable data.",
    "Trade Flows": "select a Reporting Country, a Partner Country, and Quantity or Value. Click Generate Dashboard to update the graph and downloadable data.",
  },
});

export default config;
