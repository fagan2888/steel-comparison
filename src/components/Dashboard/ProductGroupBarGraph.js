import React, { PropTypes } from 'react';
import { values, pickBy, has, omit, map, startCase, pick } from '../../utils/lodash';
import moment from 'moment';
import { HorizontalBar } from 'react-chartjs-2';
import { ComparisonBarColors } from './GraphColors';

function compare(prop) {
  return function(a, b){
    if (a[prop] > b[prop])
      return -1;
    if (a[prop] < b[prop])
      return 1;
    return 0;
  }
}

function buildTitle(params) {
  let units = params.flow_type === "QTY" ? "Thousands of Metric Tons" : "Thousands of U.S. Dollars";
  let flow = params.trade_flow === 'EXP' ? ' Exports to ' : ' Imports from ';

  const chartTitle = params.reporter_countries + flow + 'Top 5 Partner Countries of ' + params.product_groups + ' in ' + units;
  return chartTitle;
}

const Footnote = ({data, params}) => {
  return (
    <p className="graph_footnote"> 
      Source: U.S. Department of Commerce, Enforcement and Compliance.  Partner countries are sorted by most recent time period.
    </p> 
  );
}

const ProductGroupBarGraph = ({ result, params, time_periods }) => {
  let data = result.product_group_entry;
  const chartTitle = buildTitle(params);

  data = data.filter(function(entry) {
    return (entry.partner_country !== "World" && entry.partner_country !== "Other Countries");
  });

  const data_entries = data.sort(compare(time_periods[time_periods.length-1])).slice(0, 5);

  const labels = map(data_entries, (entry) => {
    return entry.partner_country;
  })

  const ytd_label = 'YTD ' + data_entries[0].ytd_end_month + ' ';

  const datasets = map(time_periods, (time_period, i) => {
    return (
      {
        label: time_period.replace('sum_', '').replace('ytd_', ytd_label),
        fill: false,
        backgroundColor:  ComparisonBarColors[i],
        data: map(data_entries, (entry) => { return entry[time_period]/1000; }),
      }
      );
  });
  const chart_key = map(datasets, (data) => {
    return data.label;
  }).join(',');

  const chartData = {
    labels: labels,
    datasets: datasets
  };
  
  const x_axis_label = params.flow_type === "QTY" ? "Thousands of Metric Tons" : "Thousands of U.S. Dollars";
  const chartOptions = {
        title: {
            display: false
        },
        legend: {
            display: true,
            position: 'right'
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data){
              return parseFloat(tooltipItem.xLabel.toFixed(2)).toLocaleString()
            }
          }
        },
        scales: { 
          xAxes: [{
              ticks: {
                    maxTicksLimit: 15,
                    beginAtZero: true,
                    userCallback: function(value, index, values) {
                      return parseFloat(value.toFixed(2)).toLocaleString();
                    }
                  },
              scaleLabel: {
                display: true,
                labelString: x_axis_label
              }
            }]
        },
        maintainAspectRatio: false
    }


  return  (
    <div>
      <h3 className="chart_title"> {chartTitle} </h3>
      <div className="bar_graph">
        <HorizontalBar key={chart_key} data={chartData} options={chartOptions} />
      </div>
      <Footnote data={data} params={params} />
    </div>
  );
}

export default ProductGroupBarGraph;
