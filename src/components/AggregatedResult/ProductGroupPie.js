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

const ProductGroupPie = ({ data, params }) => {
  const data_fields = ['ytd_2017'];

  const data_entries = data.sort(compare).slice(0, 5);

  const labels = map(data_entries, (entry) => {
    return entry.partner_country;
  })

  const datasets = [
      {
        label: 'YTD 2017',
        fill: false,
        backgroundColor:  ['red', 'green', 'yellow', 'blue', 'orange'],
        hoverBackgroundColor: ['red', 'green', 'yellow', 'blue', 'orange'],
        data: map(data_entries, (entry) => { return entry.ytd_2017; }),
      },
    ];

  const chartData = {
    labels: labels,
    datasets: datasets
  };

  let chartTitle = 'Share of ' + params.reporter_countries + ' Exports for Top 5 Partner Countries of ' + params.product_groups + ' in ' + params.flow_type + ' - YTD 2017';
  
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

export default ProductGroupPie;
