import React from 'react';
import PropTypes from 'prop-types';
import { values, pickBy, has, omit, map, startCase, range } from '../../utils/lodash';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import config from '../../config';

function buildTitle(params) {
  let units = params.flow_type === "QTY" ? "Thousands of Metric Tons" : "Thousands of U.S. Dollars";
  let flow = params.trade_flow === 'EXP' ? ' Exports to ' : ' Imports from ';

  const chart_title = params.reporter_countries + flow + params.partner_countries + ' of ' + params.product_groups + ' in ' + units;
  return chart_title;
}

const Footnote = ({last_updated}) => {
  const last_updated_date = moment(last_updated).utc().format('MM-DD-YYYY');
  return (
    <p className="graph_footnote"> 
      {config.footnote + "  Updated on " + last_updated_date + "."}
    </p> 
  );
}

const YearlyBarGraph = ({ result, params }) => {
  const last_updated = result.source_last_updated;
  const data = result.product_group_entry;
  const chartTitle = buildTitle(params);

  const excluded_fields = ['id', 'reporter_country', 'partner_country', 'product_group', 'flow_type', 'percent_change_ytd', 'ytd_end_month', 'trade_flow'];

  const data_entry = data.find((element) => {
    return element.partner_country === params.partner_countries
  });

  const data_values = map(values(omit(data_entry, excluded_fields)), value => {
    return value/1000;
  });

  const bar_colors = [];
  for (let i in range(data_values.length)){
    bar_colors.push('#5ab4ac');
  }
  /// Different color for YTD (final 2 entries)
  bar_colors[data_values.length - 1] = '#d8b365';
  bar_colors[data_values.length - 2] = '#d8b365';

  const datasets = [
      {
        label: '',
        fill: false,
        backgroundColor:  bar_colors,
        data: data_values,
      }
    ];

  const labels = map(Object.keys(omit(data_entry, excluded_fields)), key => {
    key = key.replace('sum_', '');
    const ytd_label = 'YTD ' + data_entry.ytd_end_month + ' ';
    return key.replace('ytd_', ytd_label);
  });

  const chartData = {
    labels: labels,
    datasets: datasets
  };
  
  const y_axis_label = params.flow_type === "QTY" ? "Thousands of Metric Tons" : "Thousands of U.S. Dollars";
  const chartOptions = {
        title: {
            display: false,
        },
        legend: {
            display: false
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data){
              return parseFloat(tooltipItem.yLabel.toFixed(2)).toLocaleString()
            }
          }
        },
        scales: { 
          yAxes: [{
              ticks: {
                    maxTicksLimit: 15,
                    beginAtZero: true,
                    userCallback: function(value, index, values) {
                      return parseFloat(value.toFixed(2)).toLocaleString();
                    }
                  },
              scaleLabel: {
                display: true,
                labelString: y_axis_label
              }
            }]
        },
        maintainAspectRatio: false
    }

  return  (
    <div className="pure-u-1 pure-u-xl-1-2 first_row yearly_bar primary_graph">
      <h3 className="chart_title">{chartTitle}</h3>
      <div className="bar_graph">
        <Bar data={chartData} options={chartOptions} />
      </div>
      <Footnote last_updated={last_updated}/>
    </div>
  );
}

export default YearlyBarGraph;
