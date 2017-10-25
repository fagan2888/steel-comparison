import React from 'react';
import PropTypes from 'prop-types';
import { values, pickBy, has, omit, map, startCase, pick } from '../../../utils/lodash';
import moment from 'moment';
import config from '../../../config';
import HorizontalBarGraph from './HorizontalBarGraph';
import { compare } from '../sort';

function chartTitle(query) {
  let units = query.flow_type === "QTY" ? "Thousands of Metric Tons" : "Thousands of U.S. Dollars";
  let flow = query.trade_flow === 'EXP' ? ' Exports to ' : ' Imports from ';

  const chartTitle = query.reporter_countries + flow + 'Top 5 Trading Countries of ' + query.product_groups + ' in ' + units;
  return chartTitle;
}

function footnote(){
  return (
    <p className="explorer__graph-footnote"> 
      {config.footnote + "  Partner countries are sorted by most recent time period."}
    </p> 
  );
}

const ProductGroupBar = ({ data, query, time_periods }) => {
  let graph_data = data.product_group_entry;

  graph_data = graph_data.filter(function(entry) {
    return (entry.partner_country !== "World" && entry.partner_country !== "Other Countries");
  });

  const data_entries = graph_data.sort(compare(time_periods[time_periods.length-1])).slice(0, 5);

  const labels = map(data_entries, (entry) => {
    return entry.partner_country;
  })

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

export default ProductGroupBar;
