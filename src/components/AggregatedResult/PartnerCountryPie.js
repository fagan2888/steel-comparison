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

function buildTitle(params) {
  let units = "";
  if (params.flow_type === "QTY")
    units = "Thousands of Metric Tons";
  else if (params.flow_type === "VALUE")
    units = "Thousands of U.S. Dollars";

  const chart_title = 'Share of ' + params.reporter_countries + ' Exports for ' + params.partner_countries + ' by Product in ' + units + ' - YTD 2017';
  return chart_title;
}

const PartnerCountryPie = ({ data, params }) => {
  const chartTitle = buildTitle(params);
  const data_fields = ['ytd_2017'];

  const sorted_data = data.sort(compare);
  const data_entries = sorted_data.slice(1, 6);
  const total = sorted_data[0].ytd_2017;

  const labels = map(data_entries, (entry) => {
    return entry.product_group;
  });

  const data_values = map(data_entries, (entry) => { 
    return ((entry.ytd_2017/total)*100).toFixed(2); 
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
            text: chartTitle
        },
        legend: {
            display: true
        },
        maintainAspectRatio: true
    }

  return  (
    <div className="pie_graph">
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
}

export default PartnerCountryPie;
