import React from 'react';
import PropTypes from 'prop-types';
import { values, pickBy, has, omit, map, startCase, pick } from '../../../utils/lodash';
import moment from 'moment';
import config from '../../../config';
import HorizontalBarGraph from './HorizontalBarGraph';
import { compare } from '../sort';

function chartTitle(query) {
  const units = query.flow_type === 'QTY' ? 'Thousands of Metric Tons' : 'Thousands of U.S. Dollars';
  const flow = query.trade_flow === 'EXP' ? ' Exports to ' : ' Imports from ';

  const chart_title = query.reporter_countries + flow + query.partner_countries + ' by Top Steel Products in ' + units;
  return chart_title;
}

function footnote(last_updated) {
  const last_updated_date = moment(last_updated).utc().format('MM-DD-YYYY');
  return (
    <p className="explorer__graph-footnote"> 
      {config.footnote + '  Updated on ' + last_updated_date + '.  Product groups are sorted by most recent time period.'}
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
      <HorizontalBarGraph 
        data_entries={data_entries} 
        labels={labels} 
        query={query}
        time_periods={time_periods}
        title={chartTitle(query)}
      />

      {footnote(data.source_last_updated)}
    </div>
  );
};

export default PartnerCountryBar;
