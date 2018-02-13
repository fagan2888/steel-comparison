import React from 'react';
import PropTypes from 'prop-types';
import { compact, values, pickBy, has, omit, map, startCase, range } from '../../utils/lodash';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import config from '../../config';
import Modal from './Modals/YearlyBarModal';

function chartTitle(query) {
  let units = query.flow_type === 'QTY' ? 'Thousands of Metric Tons' : 'Thousands of U.S. Dollars';
  let flow = query.trade_flow === 'EXP' ? ' Exports to ' : ' Imports from ';

  const chart_title = query.reporter_countries + flow + query.partner_countries + ' of ' + query.product_groups + ' in ' + units;
  return chart_title;
}

function footnote(last_updated) {
  const last_updated_date = moment(last_updated).utc().format('MM-DD-YYYY');
  return (
    <p className="explorer__graph-footnote"> 
      {config.footnote + '  Updated on ' + last_updated_date + '.'}
    </p> 
  );
}

class YearlyBarGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalOpen: true});
  }

  closeModal() {
    this.setState({modalOpen: false});
  }

  render() {
    const { data, query } = this.props;
    const excluded_fields = ['id', 'reporter_country', 'partner_country', 'product_group', 'flow_type', 'percent_change_ytd', 'ytd_end_month', 'trade_flow'];

    const data_entry = data.product_group_entry.find((element) => {
      return element.partner_country === query.partner_countries;
    });

    const data_values = [];
    const labels = [];
    const bar_colors = [];
    const keys = Object.keys(omit(data_entry, excluded_fields)).sort();

    for (let i in keys){
      let key = keys[i];
      data_values.push(data_entry[key]/1000);
      key = key.replace('sum_', '');
      let ytd_label = 'YTD ' + data_entry.ytd_end_month + ' ';
      labels.push(key.replace('ytd_', ytd_label));
    }

    for (let i in range(data_values.length)){
      if (keys[i].includes('ytd'))
        bar_colors.push('#d8b365');
      else
        bar_colors.push('#5ab4ac');
    }

    const datasets = [
      {
        label: '',
        fill: false,
        backgroundColor:  bar_colors,
        data: data_values
      }
    ];

    const chartData = {
      labels: labels,
      datasets: datasets
    };
    
    const y_axis_label = query.flow_type === 'QTY' ? 'Thousands of Metric Tons' : 'Thousands of U.S. Dollars';
    const chartOptions = {
      title: {
        display: false
      },
      legend: {
        display: false
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data){
            return parseFloat(tooltipItem.yLabel.toFixed(2)).toLocaleString();
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
    };

    return  (
      <div className="pure-u-1 pure-u-xl-1-2 explorer__first-row explorer__yearly-bar explorer__primary-graph">
        <h3 className="explorer__chart-title">
          {chartTitle(query) + ' - '} 
          <a href="#" onClick={this.openModal}>View Data</a>
        </h3>

        <div className="explorer__yearly-bar-graph">
          <Bar data={chartData} options={chartOptions} />
        </div>
        {footnote(data.source_last_updated)}
        <Modal modalOpen={this.state.modalOpen} closeModal={this.closeModal} labels={labels} data={data_values} query={query} title={chartTitle(query)}/>
      </div>
    );
  }
};

export default YearlyBarGraph;
