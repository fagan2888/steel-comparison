import React from 'react';
import PropTypes from 'prop-types';
import { map, remove, startCase } from '../../../utils/lodash';
import moment from 'moment';
import PieGraph from './PieGraph';
import { PieColors } from '../GraphColors';
import config from '../../../config';
import { compare } from '../sort';

function buildTitle(query, ytd_end_month, time_period) {
  const units = query.flow_type === 'QTY' ? 'Metric Tons' : 'U.S. Dollars';
  const flow = query.trade_flow === 'EXP' ? ' Exports to ' : ' Imports from ';
  const ytd_label = 'YTD ' + ytd_end_month + ' ';

  const chart_title = 'Share of ' + query.reporter_countries + flow + query.partner_countries + ' by Product in ' + units + ' - ' + time_period.replace('sum_', '').replace('ytd_', ytd_label);
  return chart_title;
}

const Footnote = ({query, total, last_updated}) => {
  const units = query.flow_type === 'QTY' ? ' metric tons' : ' U.S. dollars';
  const last_updated_date = moment(last_updated).utc().format('MM-DD-YYYY');

  return (
    <p className="explorer__graph-footnote"> 
      {config.footnote + '  Updated on ' + last_updated_date + '.  Trade covered in the table is ' + parseFloat(total.toFixed(2)).toLocaleString() + units + '.'}
    </p> 
  );
};

const PartnerCountryPie = ({ data, query, last_updated, time_period }) => {
  const chartTitle = buildTitle(query, data[0].ytd_end_month, time_period);

  const data_entries = data.sort(compare(time_period)).slice();
  const total_entry = remove(data_entries, function(n) {
    return n.product_group === 'All Steel Mill Products';
  });

  const total = total_entry[0][time_period];

  const labels = map(data_entries, (entry) => {
    return entry.product_group;
  });

  const data_values = map(data_entries, (entry) => { 
    if (total === 0)
      return 0;
    else
      return ((entry[time_period]/total)*100).toFixed(2); 
  });

  return  (
    <div>
      <h3 className="explorer__chart-title">{chartTitle}</h3>
      <PieGraph data_values={data_values} labels={labels} time_period={time_period} />
      <Footnote query={query} total={total} last_updated={last_updated}/>
    </div>
  );
};

export default PartnerCountryPie;
