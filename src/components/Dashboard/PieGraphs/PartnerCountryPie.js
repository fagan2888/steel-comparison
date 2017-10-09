import React from 'react';
import PropTypes from 'prop-types';
import { map, remove, startCase } from '../../../utils/lodash';
import moment from 'moment';
import PieGraph from './PieGraph';
import { PieColors } from '../GraphColors';
import config from '../../../config';
import { compare } from '../sort';

function buildTitle(params, ytd_end_month, time_period) {
  const units = params.flow_type === "QTY" ? "Metric Tons" : "U.S. Dollars";
  const flow = params.trade_flow === 'EXP' ? ' Exports to ' : ' Imports from ';
  const ytd_label = 'YTD ' + ytd_end_month + ' ';

  const chart_title = 'Share of ' + params.reporter_countries + flow + params.partner_countries + ' by Product in ' + units + ' - ' + time_period.replace('sum_', '').replace('ytd_', ytd_label);
  return chart_title;
}

const Footnote = ({params, total}) => {
  const units = params.flow_type === "QTY" ? " metric tons" : " U.S. dollars";

  return (
    <p className="graph_footnote"> 
      {config.footnote + "  Trade covered in the table is " + parseFloat(total.toFixed(2)).toLocaleString() + units + "."}
    </p> 
  );
}

const PartnerCountryPie = ({ data, params, last_updated, time_period }) => {
  const chartTitle = buildTitle(params, data[0].ytd_end_month, time_period);

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
      <h3 className="chart_title">{chartTitle}</h3>
      <PieGraph data_values={data_values} labels={labels} time_period={time_period} />
      <Footnote params={params} total={total}/>
    </div>
  );
}

export default PartnerCountryPie;
