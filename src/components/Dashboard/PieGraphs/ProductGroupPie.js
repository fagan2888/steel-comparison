import React from 'react';
import PropTypes from 'prop-types';
import { values, pickBy, has, omit, map, startCase, pick, remove } from '../../../utils/lodash';
import moment from 'moment';
import PieGraph from './PieGraph';
import { PieColors } from '../GraphColors';
import config from '../../../config';
import { compare } from '../sort';

function buildTitle(query, ytd_end_month, time_period) {
  const units = query.flow_type === 'QTY' ? 'Metric Tons' : 'U.S. Dollars';
  const flow = query.trade_flow === 'EXP' ? ' Exports to ' : ' Imports from ';
  const ytd_label = 'YTD ' + ytd_end_month + ' ';

  const chart_title = 'Share of ' + query.reporter_countries + flow + 'Top 5 Partner Countries of ' + query.product_groups + ' in ' + units + ' - ' + time_period.replace('sum_', '').replace('ytd_', ytd_label);
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

const ProductGroupPie = ({ data, query, last_updated, time_period }) => {
  const chartTitle = buildTitle(query, data[0].ytd_end_month, time_period);

  const sorted_data = data.sort(compare(time_period)).slice();
  remove(sorted_data, function(n) {
    return n.partner_country === 'Other Countries';
  });
  const data_entries = sorted_data.slice(1, 6);
  const total = sorted_data[0][time_period];

  const labels = map(data_entries, (entry) => {
    return entry.partner_country;
  });
  labels.push('Rest of the World');

  let percentage_subtotal = 0;
  const data_values = map(data_entries, (entry) => { 
    let percentage = (entry[time_period]/total)*100;
    percentage_subtotal += percentage;
    return percentage.toFixed(2); 
  });
  data_values.push((100 - percentage_subtotal).toFixed(2));

  return  (
    <div>
      <PieGraph data_values={data_values} labels={labels} time_period={time_period} query={query} title={chartTitle} />
      <Footnote query={query} total={total} last_updated={last_updated}/>
    </div>
  );
};

export default ProductGroupPie;
