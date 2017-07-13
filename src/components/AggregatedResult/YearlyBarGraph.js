import React, { PropTypes } from 'react';
import { values, pickBy, has, omit, map, startCase } from '../../utils/lodash';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';

const YearlyBarGraph = ({ data, params }) => {
  const excluded_fields = ['id', 'reporter_country', 'partner_country', 'product_group', 'flow_type', 'percent_change_ytd'];

  const data_entry = data.find((element) => {
    return element.partner_country === 'World'
  });

  const datasets = [
      {
        label: '',
        fill: false,
        backgroundColor:  'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: values(omit(data_entry, excluded_fields)),
      }
    ];
  
  const labels = Object.keys(omit(data_entry, excluded_fields));

  const chartData = {
    labels: labels,
    datasets: datasets
  };

  let chartTitle = params.reporter_countries + ' Exports of ' + params.product_groups + ' from World in ' + params.flow_type;
  
  const chartOptions = {
        title: {
            display: true,
            text: chartTitle
        },
        legend: {
            display: false
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
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default YearlyBarGraph;
