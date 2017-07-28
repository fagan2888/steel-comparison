import React, { PropTypes } from 'react';
import { values, pickBy, has, omit, map, startCase } from '../../utils/lodash';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';

function buildTitle(params) {
  let units = "";
  if (params.flow_type === "QTY")
    units = "Thousands of Metric Tons";
  else if (params.flow_type === "VALUE")
    units = "Thousands of U.S. Dollars";
  const chart_title = params.reporter_countries + ' Exports of ' + params.product_groups + ' for ' + params.partner_countries + ' in ' + units;
  return chart_title;
}

const Footnote = ({data, params, last_updated}) => {
  const ytd_end_month = data[0].ytd_end_month;
  const last_updated_date = moment(last_updated).utc().format('MM-DD-YYYY');
  return (
    <p className="graph_footnote"> 
      Source: Department of Commerce, annual data from UN Statistics, YTD data (Jan-{ytd_end_month}) from Global Trade Atlas, updated on {last_updated_date}.
    </p> 
  );
}

const YearlyBarGraph = ({ data, params, last_updated }) => {
  const chartTitle = buildTitle(params);

  const excluded_fields = ['id', 'reporter_country', 'partner_country', 'product_group', 'flow_type', 'percent_change_ytd', 'ytd_end_month'];

  const data_entry = data.find((element) => {
    return element.partner_country === params.partner_countries
  });

  const data_values = map(values(omit(data_entry, excluded_fields)), value => {
    return value/1000;
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
        data: data_values,
      }
    ];
  
  const labels = map(Object.keys(omit(data_entry, excluded_fields)), key => {
    key = key.replace('sum_', '');
    return key.replace('ytd_', 'YTD ');
  });

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
