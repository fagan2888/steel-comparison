import React, { PropTypes } from 'react';
import { values, pickBy, has, omit, map, startCase, range } from '../../utils/lodash';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';

function buildTitle(params) {
  let units = params.flow_type === "QTY" ? "Thousands of Metric Tons" : "Thousands of U.S. Dollars";
  let flow = params.trade_flow === 'EXP' ? ' Exports to ' : ' Imports from ';

  const chart_title = params.reporter_countries + flow + params.partner_countries + ' of ' + params.product_groups + ' in ' + units;
  return chart_title;
}

const Footnote = ({data, params, last_updated}) => {
  const last_updated_date = moment(last_updated).utc().format('MM-DD-YYYY');
  return (
    <p className="graph_footnote"> 
      Source: Department of Commerce, annual data from UN Statistics, YTD data from Global Trade Atlas, updated on {last_updated_date}.
    </p> 
  );
}

const YearlyBarGraph = ({ data, params, last_updated }) => {
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
    bar_colors.push('rgba(255,99,132,0.4)');
  }
  /// Different color for YTD (final 2 entries)
  bar_colors[data_values.length - 1] = 'rgba(0,99,132,0.4)';
  bar_colors[data_values.length - 2] = 'rgba(0,99,132,0.4)';

  const datasets = [
      {
        label: '',
        fill: false,
        backgroundColor:  bar_colors,
        borderWidth: 1,
        hoverBackgroundColor: bar_colors,
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
            display: true,
            text: chartTitle,
            fontSize: 16
        },
        legend: {
            display: false
        },
        scales: { 
          yAxes: [{
              ticks: {
                    maxTicksLimit: 15,
                    userCallback: function(value, index, values) {
                      value = value.toString();
                      value = value.split(/(?=(?:...)*$)/);
                      value = value.join(',');
                      return value;
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
    <div>
      <div className="bar_graph">
        <Bar data={chartData} options={chartOptions} />
      </div>
      <Footnote data={data} params={params} last_updated={last_updated}/>
    </div>
  );
}

export default YearlyBarGraph;
