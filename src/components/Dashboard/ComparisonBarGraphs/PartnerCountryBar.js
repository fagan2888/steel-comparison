import React from 'react';
import PropTypes from 'prop-types';
import { values, pickBy, has, omit, map, startCase, pick } from '../../../utils/lodash';
import moment from 'moment';
import config from '../../../config';
import HorizontalBarGraph from './HorizontalBarGraph';
import { compare } from '../sort';

function chartTitle(query) {
  const units = query.flow_type === "QTY" ? "Thousands of Metric Tons" : "Thousands of U.S. Dollars";
  const flow = query.trade_flow === 'EXP' ? ' Exports to ' : ' Imports from ';

  const chart_title = query.reporter_countries + flow + query.partner_countries + ' by Top Steel Products in ' + units;
  return chart_title;
}

function footnote() {
  return (
    <p className="explorer__graph-footnote"> 
      {config.footnote + "  Product groups are sorted by most recent time period."}
    </p> 
  );
}

const PartnerCountryBar = ({ data, query, time_periods }) => {
  const data_entries = data.partner_country_entry.sort(compare(time_periods[time_periods.length-1])).slice(1, 6);

  const labels = map(data_entries, (entry) => {
    return entry.product_group;
  });

  return  (
    <div>
      <h3 className="explorer__chart-title">{chartTitle(query)}</h3>

      <HorizontalBarGraph 
        data_entries={data_entries} 
        labels={labels} 
        query={query}
        time_periods={time_periods}
      />

      {footnote()}
    </div>
  );
}

export default PartnerCountryBar;
