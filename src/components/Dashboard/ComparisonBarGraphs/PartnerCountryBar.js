import React from 'react';
import PropTypes from 'prop-types';
import { values, pickBy, has, omit, map, startCase, pick } from '../../../utils/lodash';
import moment from 'moment';
import config from '../../../config';
import HorizontalBarGraph from './HorizontalBarGraph';
import { compare } from '../sort';

function buildTitle(params) {
  const units = params.flow_type === "QTY" ? "Thousands of Metric Tons" : "Thousands of U.S. Dollars";
  const flow = params.trade_flow === 'EXP' ? ' Exports to ' : ' Imports from ';

  const chart_title = params.reporter_countries + flow + params.partner_countries + ' by Top Steel Products in ' + units;
  return chart_title;
}

const Footnote = () => {
  return (
    <p className="graph_footnote"> 
      {config.footnote + "  Product groups are sorted by most recent time period."}
    </p> 
  );
}

const PartnerCountryBar = ({ result, params, time_periods }) => {
  const data = result.partner_country_entry;
  const data_entries = data.sort(compare(time_periods[time_periods.length-1])).slice(1, 6);

  const labels = map(data_entries, (entry) => {
    return entry.product_group;
  });

  return  (
    <div>
      <h3 className="chart_title"> {buildTitle(params)} </h3>

      <HorizontalBarGraph 
        data_entries={data_entries} 
        labels={labels} 
        params={params}
        time_periods={time_periods}
      />

      <Footnote />
    </div>
  );
}

export default PartnerCountryBar;
