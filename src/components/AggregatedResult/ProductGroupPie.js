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

function buildTitle(params) {
  let units = "";
  if (params.flow_type === "QTY")
    units = "Thousands of Metric Tons";
  else if (params.flow_type === "VALUE")
    units = "Thousands of U.S. Dollars";

  const chart_title = 'Share of ' + params.reporter_countries + ' Exports for Top 5 Partner Countries of ' + params.product_groups + ' in ' + units + ' - ' + startCase(params.pie_period);
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

const ProductGroupPie = ({ data, params, last_updated }) => {
  const chartTitle = buildTitle(params);

  const sorted_data = data.sort(compare);
  const data_entries = sorted_data.slice(1, 6);
  const total = sorted_data[0][params.pie_period];

  const labels = map(data_entries, (entry) => {
    return entry.partner_country;
  });

  const data_values = map(data_entries, (entry) => { 
    return ((entry[params.pie_period]/total)*100).toFixed(2); 
  });

  const datasets = [
      {
        label: 'YTD 2017',
        fill: false,
        backgroundColor:  ['red', 'green', 'yellow', 'blue', 'orange'],
        hoverBackgroundColor: ['red', 'green', 'yellow', 'blue', 'orange'],
        data: data_values,
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
        maintainAspectRatio: true
    }


  return  (
    <div>
      <div className="pie_graph">
        <Pie data={chartData} options={chartOptions} />
      </div>
      <Footnote data={data} params={params} last_updated={last_updated}/>
    </div>
  );
}

export default ProductGroupPie;
