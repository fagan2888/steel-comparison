const footnote = 'Source: U.S. Department of Commerce, Enforcement and Compliance.  Includes content supplied by IHS Global Ltd.; Copyright © IHS Global, Ltd., 2018. All rights reserved.';
const monitor_link = 'https://www.trade.gov/steel/global-monitor.asp';
const faqs_link = 'https://www.trade.gov/steel/pdfs/faqs.pdf';

const config = Object.assign({
  monitor_link: monitor_link,
  footnote: footnote,
  faqs_link: faqs_link,
  instructions: {
    "Reporting Countries": "Select a Trade Flow, two Reporting Countries, a Partner Country, and Quantity or Value. Click Generate Dashboard to update the graph and downloadable data.",
    "Partner Countries": "Select a Trade Flow, a Reporting Country, two Partner Countries, and Quantity or Value. Click Generate Dashboard to update the graph and downloadable data.",
    "Product Groups": "Select a Trade Flow, a Reporting Country, a Partner Country, two Product Groups, and Quantity or Value. Click Generate Dashboard to update the graph and downloadable data.",
    "Trade Flows": "Select a Reporting Country, a Partner Country, and Quantity or Value. Click Generate Dashboard to update the graph and downloadable data.",
  },
});

export default config;
