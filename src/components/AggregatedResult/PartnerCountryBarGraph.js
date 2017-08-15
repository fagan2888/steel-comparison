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

function buildTitle(params) {
  const units = params.flow_type === "QTY" ? "Thousands of Metric Tons" : "Thousands of U.S. Dollars";
  const flow = params.trade_flow === 'EXP' ? ' Exports to ' : ' Imports from ';

  const chart_title = params.reporter_countries + flow + params.partner_countries + ' in ' + units;
  return chart_title;
}

const Footnote = ({data, params, last_updated}) => {
  //const last_updated_date = moment(last_updated).utc().format('MM-DD-YYYY');
  return (
    <p className="graph_footnote"> 
      Source: U.S. Department of Commerce, Enforcement and Compliance.
    </p> 
  );
}

const PartnerCountryBarGraph = ({ data, params, last_updated, time_periods }) => {
  const chartTitle = buildTitle(params);

  const data_entries = data.sort(compare).slice(1, 6);

  const labels = map(data_entries, (entry) => {
    return entry.product_group;
  });

  const ytd_label = 'YTD ' + data_entries[0].ytd_end_month + ' ';
  const first_dataset_label = time_periods.first_interval.replace('sum_', '').replace('ytd_', ytd_label);
  const second_dataset_label = time_periods.second_interval.replace('sum_', '').replace('ytd_', ytd_label);

  const datasets = [
      {
        label: first_dataset_label,
        fill: false,
        backgroundColor:  'rgba(215,90,0,0.7)',
        data: map(data_entries, (entry) => { return entry[time_periods.first_interval]/1000; }),
      },
      {
        label: second_dataset_label,
        fill: false,
        backgroundColor:  'rgba(0,99,132,0.7)',
        data: map(data_entries, (entry) => { return entry[time_periods.second_interval]/1000; }),
      },
    ];

  const chartData = {
    labels: labels,
    datasets: datasets
  };
  
  const x_axis_label = params.flow_type === "QTY" ? "Thousands of Metric Tons" : "Thousands of U.S. Dollars";
  const chartOptions = {
        title: {
            display: true,
            text: chartTitle,
            fontSize: 16
        },
        legend: {
            display: true
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
                      value = value.toString();
                      value = value.split(/(?=(?:...)*$)/);
                      value = value.join(',');
                      return value;
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
      <div className="bar_graph">
        <HorizontalBar data={chartData} options={chartOptions} />
      </div>
      <Footnote data={data} params={params} last_updated={last_updated}/>
    </div>
  );
}

export default PartnerCountryBarGraph;
