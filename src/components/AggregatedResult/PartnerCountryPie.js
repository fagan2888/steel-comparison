import React, { PropTypes } from 'react';
import { values, pickBy, has, omit, map, startCase, pick } from '../../utils/lodash';
import moment from 'moment';
import { Pie } from 'react-chartjs-2';

function compare(a, b) {
  if (a.ytd_2017 > b.ytd_2017)
    return -1;
  if (a.ytd_2017 < b.ytd_2017)
    return 1;
  return 0;
}

function buildTitle(params, ytd_end_month) {
  const units = params.flow_type === "QTY" ? "Metric Tons" : "U.S. Dollars";
  const flow = params.trade_flow === 'EXP' ? ' Exports to ' : ' Imports from ';
  const ytd_label = 'YTD ' + ytd_end_month + ' ';

  const chart_title = 'Share of ' + params.reporter_countries + flow + params.partner_countries + ' by Product in ' + units + ' - ' + params.pie_period.replace('sum_', '').replace('ytd_', ytd_label);
  return chart_title;
}

const Footnote = ({data, params, total}) => {
  const units = params.flow_type === "QTY" ? "metric tons" : "U.S. dollars";

  return (
    <p className="graph_footnote"> 
      Source:  U.S. Department of Commerce, Enforcement and Compliance:  Trade covered in the table is {total.toFixed(2)} {units}.
    </p> 
  );
}

const PartnerCountryPie = ({ data, params, last_updated }) => {
  const chartTitle = buildTitle(params, data[0].ytd_end_month);

  const sorted_data = data.sort(compare);
  const data_entries = sorted_data.slice(1, 6);
  const total = sorted_data[0][params.pie_period];

  const labels = map(data_entries, (entry) => {
    return entry.product_group;
  });

  const data_values = map(data_entries, (entry) => { 
    return ((entry[params.pie_period]/total)*100).toFixed(2); 
  });

  const datasets = [
      {
        label: 'YTD 2017',
        fill: false,
        backgroundColor:  ['red', 'green', 'yellow', 'blue', 'orange'],
        hoverBackgroundColor: ['red', 'green', 'yellow', 'blue', 'orange'],
        data: data_values,
      },
    ];

  const chartData = {
    labels: labels,
    datasets: datasets
  };
  
  const chartOptions = {
        title: {
            display: true,
            text: chartTitle,
            fontSize: 16
        },
        legend: {
            display: true
        },
        maintainAspectRatio: true
    }

  return  (
    <div>
      <div className="pie_graph">
        <Pie data={chartData} options={chartOptions} />
      </div>
      <Footnote data={data} params={params} total={total}/>
    </div>
  );
}

export default PartnerCountryPie;
