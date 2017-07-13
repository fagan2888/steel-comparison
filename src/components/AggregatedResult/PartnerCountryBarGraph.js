import React, { PropTypes } from 'react';
import { values, pickBy, has, omit, map, startCase, pick } from '../../utils/lodash';
import moment from 'moment';
import { HorizontalBar } from 'react-chartjs-2';

function compare(a, b) {
  if (a.ytd_2017 > b.ytd_2017)
    return -1;
  if (a.ytd_2017 < b.ytd_2017)
    return 1;
  return 0;
}

const PartnerCountryBarGraph = ({ data, params }) => {
  const data_fields = ['ytd_2016', 'ytd_2017'];

  const data_entries = data.sort(compare).slice(1, 6);

  const labels = map(data_entries, (entry) => {
    return entry.product_group;
  })

  const datasets = [
      {
        label: 'YTD 2016',
        fill: false,
        backgroundColor:  'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: map(data_entries, (entry) => { return entry.ytd_2016; }),
      },
      {
        label: 'YTD 2017',
        fill: false,
        backgroundColor:  'rgba(0,99,132,0.2)',
        borderColor: 'rgba(0,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(0,99,132,0.4)',
        hoverBorderColor: 'rgba(0,99,132,1)',
        data: map(data_entries, (entry) => { return entry.ytd_2017; }),
      },
    ];

  const chartData = {
    labels: labels,
    datasets: datasets
  };

  let chartTitle = params.reporter_countries + ' Exports for ' + params.partner_countries + ' in ' + params.flow_type;
  
  const chartOptions = {
        title: {
            display: true,
            text: chartTitle
        },
        legend: {
            display: true
        },
        scales: { 
          yAxes: [{
              ticks: {
                    maxTicksLimit: 15
                  }
            }]
        },
        maintainAspectRatio: false
    }


  return  (
    <div className="bar_graph">
      <HorizontalBar data={chartData} options={chartOptions} />
    </div>
  );
}

export default PartnerCountryBarGraph;
