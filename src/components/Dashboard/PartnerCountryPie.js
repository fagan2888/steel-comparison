import React from 'react';
import PropTypes from 'prop-types';
import { map, remove } from '../../utils/lodash';
import moment from 'moment';
import { Pie, Chart } from 'react-chartjs-2';
import { PieColors } from './GraphColors';

function compare(prop) {
  return function(a, b){
    if (a[prop] > b[prop])
      return -1;
    if (a[prop] < b[prop])
      return 1;
    return 0;
  }
}

function buildTitle(params, ytd_end_month, time_period) {
  const units = params.flow_type === "QTY" ? "Metric Tons" : "U.S. Dollars";
  const flow = params.trade_flow === 'EXP' ? ' Exports to ' : ' Imports from ';
  const ytd_label = 'YTD ' + ytd_end_month + ' ';

  const chart_title = 'Share of ' + params.reporter_countries + flow + params.partner_countries + ' by Product in ' + units + ' - ' + time_period.replace('sum_', '').replace('ytd_', ytd_label);
  return chart_title;
}

const Footnote = ({data, params, total}) => {
  const units = params.flow_type === "QTY" ? " metric tons" : " U.S. dollars";

  return (
    <p className="graph_footnote"> 
      {"Source: Annual data from UN Comtrade, Desa/UNSD; YTD data from HIS Global Trade Atlas sourced from the reporting country's official statistics.  Trade covered in the table is " + parseFloat(total.toFixed(2)).toLocaleString() + units + "."}
    </p> 
  );
}

const PartnerCountryPie = ({ data, params, last_updated, time_period }) => {
  const chartTitle = buildTitle(params, data[0].ytd_end_month, time_period);

  const data_entries = data.sort(compare(time_period)).slice();
  const total_entry = remove(data_entries, function(n) {
         return n.product_group === 'All Steel Mill Products';
       });

  const total = total_entry[0][time_period];

  const labels = map(data_entries, (entry) => {
    return entry.product_group;
  });

  const data_values = map(data_entries, (entry) => { 
    if (total === 0)
      return 0;
    else
      return ((entry[time_period]/total)*100).toFixed(2); 
  });

  const datasets = [
      {
        label: 'YTD 2017',
        fill: false,
        backgroundColor:  PieColors,
        data: data_values,
      },
    ];

  const chartData = {
    labels: labels,
    datasets: datasets
  };
  
  const chartOptions = {
        title: {
            display: false
        },
        legend: {
            display: true,
            position: 'right',
            labels: {
              generateLabels: function(chart) {
              var data = chart.data;
              if (data.labels.length && data.datasets.length) {
                return data.labels.map(function(label, i) {
                  var meta = chart.getDatasetMeta(0);
                  var ds = data.datasets[0];
                  var arc = meta.data[i];
                  var custom = arc && arc.custom || {};
                  var getValueAtIndexOrDefault = Chart.helpers.getValueAtIndexOrDefault;
                  var arcOpts = chart.options.elements.arc;
                  var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
                  var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
                  var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);
                  var value = chart.config.data.datasets[arc._datasetIndex].data[arc._index];
                  return {
                    text: label + ': ' + value + '%',
                    fillStyle: fill,
                    strokeStyle: stroke,
                    lineWidth: bw,
                    hidden: isNaN(ds.data[i]) || meta.data[i].hidden,

                    // Extra data used for toggling the correct item
                    index: i
                  };
                });
              }
              return [];
            }
          }
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data){
              var index = tooltipItem.index;                 
              return  data.labels[index] + ': ' + data.datasets[0].data[index] + '%';
            }
          }
        },
        maintainAspectRatio: true
      }

  return  (
    <div>
      <h3 className="chart_title"> {chartTitle} </h3>
      <div className="pie_graph">
        <Pie data={chartData} options={chartOptions} />
      </div>
      <Footnote data={data} params={params} total={total}/>
    </div>
  );
}

export default PartnerCountryPie;
