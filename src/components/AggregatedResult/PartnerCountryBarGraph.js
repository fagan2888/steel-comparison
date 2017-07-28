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
  let units = "";
  if (params.flow_type === "QTY")
    units = "Thousands of Metric Tons";
  else if (params.flow_type === "VALUE")
    units = "Thousands of U.S. Dollars";

  const chart_title = params.reporter_countries + ' Exports for ' + params.partner_countries + ' in ' + units;
  return chart_title;
}

const Footnote = ({data, params, last_updated}) => {
  //const ytd_end_month = data[0].ytd_end_month;
  //const last_updated_date = moment(last_updated).utc().format('MM-DD-YYYY');
  return (
    <p className="graph_footnote"> 
      Footnote placeholder.  
    </p> 
  );
}

const PartnerCountryBarGraph = ({ data, params, last_updated }) => {
  const chartTitle = buildTitle(params);

  const data_entries = data.sort(compare).slice(1, 6);

  const labels = map(data_entries, (entry) => {
    return entry.product_group;
  })

  const datasets = [
      {
        label: startCase(params.comparison_interval_start),
        fill: false,
        backgroundColor:  'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: map(data_entries, (entry) => { return entry[params.comparison_interval_start]/1000; }),
      },
      {
        label: startCase(params.comparison_interval_end),
        fill: false,
        backgroundColor:  'rgba(0,99,132,0.2)',
        borderColor: 'rgba(0,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(0,99,132,0.4)',
        hoverBorderColor: 'rgba(0,99,132,1)',
        data: map(data_entries, (entry) => { return entry[params.comparison_interval_end]/1000; }),
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
        scales: { 
          xAxes: [{
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
        <HorizontalBar data={chartData} options={chartOptions} />
      </div>
      <Footnote data={data} params={params} last_updated={last_updated}/>
    </div>
  );
}

export default PartnerCountryBarGraph;
