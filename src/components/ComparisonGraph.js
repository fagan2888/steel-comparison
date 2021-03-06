import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import Modal from './ComparisonModal';
import { omit, uniq, differenceBy } from 'lodash';
import moment from 'moment';
import config from '../config';
import queryString from 'query-string';

class ComparisonGraph extends Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onModalButtonClick = this.onModalButtonClick.bind(this);
  }

  openModal() {
    this.setState({modalOpen: true});
  }

  closeModal() {
    this.setState({modalOpen: false});
  }

  onModalButtonClick(event){
    event.preventDefault();
    this.openModal();
  }

  render() {
    const query = queryString.parse(this.props.location.search, {arrayFormat: 'comma'});

    let queryLabelKey;
    /* Deriving queryLabelKey based on the currently available query object is preferable to receiving comparisonType based on props since I was unable to get `shouldComponentUpdate` to work (and from reading the docs, probably shouldn't rely on that anyway...) */
    if (query['trade_flow'].length === 0) {
      queryLabelKey = 'trade_flow';
    } else if (query['product_groups'].length === 2) {
      queryLabelKey = 'product_groups';
    } else if (query['reporter_countries'].length === 2) {
      queryLabelKey ='reporter_countries';
    } else if (query['partner_countries'].length === 2) {
      queryLabelKey = 'partner_countries';
    }
    
    /* How to refer to the two data sets: */
    const LabelForSeriesA = (queryLabelKey === 'trade_flow') ? "IMP" : query[queryLabelKey][0];
    const LabelForSeriesB = (queryLabelKey === 'trade_flow') ? "EXP" : query[queryLabelKey][1];

    /* assign the two objects in the data array accordingly */
    const dataObjB = this.props.data_array.filter(obj => obj[this.props.dataset_label_key] === LabelForSeriesB);
    const dataObjA = this.props.data_array.filter(obj => obj[this.props.dataset_label_key] === LabelForSeriesA);
    
    const y_axis_label = query.flow_type === 'QTY' ? 'Thousands of Metric Tons' : 'Thousands of U.S. Dollars';

    const data_valuesA = [];
    const data_valuesB = [];
    const excluded_fields = ['id', 'reporter_country', 'partner_country', 'product_group', 'flow_type', 'ytd_end_month', 'trade_flow', 'updated_date'];
    
    const original_labelsA = Object.keys(omit(this.props.data_array[0], excluded_fields));
    const original_labelsB = Object.keys(omit(this.props.data_array[1], excluded_fields));
    /* push the two sets of labels together, dedupe and `.sort()` */
    let original_labels_combined = uniq(original_labelsA.concat(original_labelsB)).sort();

    /* If we're comparing two reporter countries, and they have different ytd_end_month, then we've been instructed to remove the YTD fields from the data */
    let ytd_disclaimer = false;
    if ((queryLabelKey === 'reporter_countries') && !!(this.props.data_array[1])) {
      if (this.props.data_array[0].ytd_end_month !== this.props.data_array[1].ytd_end_month) {
        let ytd_fields = original_labels_combined.filter(label => label.startsWith('ytd_'));
        original_labels_combined = differenceBy(original_labels_combined, ytd_fields);
        ytd_disclaimer = true;
      };
    };

    const x_axis_values = [];

    for (let i in original_labels_combined){
      let label = original_labels_combined[i];
      /* Take the value of the key from the object (which is the first and only object in its array) */
      if (dataObjA.length > 0) { data_valuesA.push(dataObjA[0][label]/1000) }
      /* Same thing here for LabelSeriesB */
      if (dataObjB.length > 0) { data_valuesB.push(dataObjB[0][label]/1000) }
      /* prepare the x-axis labels by removing 'sum_' and capitalizing 'ytd' */
      label = label.replace('sum_', '');
      let ytd_label = 'YTD ' + this.props.data_array[0].ytd_end_month + ' ';
      x_axis_values.push(label.replace('ytd_', ytd_label));
    }

    /* Next, remove years for null values if an index position is null in both datasets */
    x_axis_values.forEach((label, index) => {
      if (!data_valuesA[index] && !data_valuesB[index]) {
        x_axis_values.splice(index, 1);
        data_valuesA.splice(index, 1);
        data_valuesB.splice(index, 1);
      }
    });
    
    // console.log(this.props.data_array);
    // console.log(data_valuesA);
    // console.log(data_valuesB);

    function constructChartTitle(dataset_label_key, query, data_array) {
      let units = query.flow_type === 'QTY' ? 'Thousands of Metric Tons' : 'Thousands of U.S. Dollars';
      let flow = query.trade_flow === 'EXP' ? ' Exports to ' : ' Imports from ';
      let chart_title;
      if (dataset_label_key === "product_group") {
        chart_title = (query.reporter_countries + flow + query.partner_countries + ' of ' + query.product_groups + ' in ' + units).replace(',', " and ");
      } else if (dataset_label_key === "trade_flow") {
        chart_title = (query.reporter_countries + ' Imports from and Exports to ' + query.partner_countries + ' of ' + data_array.product_group + ' in ' + units).replace(',', " and ");
      } else {
        chart_title = (query.reporter_countries + flow + query.partner_countries + ' of ' + data_array.product_group + ' in ' + units).replace(',', " and ");
      }
      return chart_title;
    }

    const chartTitle = constructChartTitle(this.props.dataset_label_key, query, this.props.data_array[0]);

    const constructFootnote = () => {
      let updatedA;
      let updatedB;
      let updated_note;
      if (queryLabelKey === 'reporter_countries') {
        if (dataObjA.length > 0) { updatedA =  moment(dataObjA[0].updated_date, 'DDMMMYYYY').utc().format('MM-DD-YYYY') };
        if (dataObjB.length > 0) { updatedB =  moment(dataObjB[0].updated_date, 'DDMMMYYYY').utc().format('MM-DD-YYYY') };

        if (!!updatedA && !!updatedB) {
          updated_note = `${LabelForSeriesA} updated on ${updatedA}, ${LabelForSeriesB} updated on ${updatedB}`;
        } else if (!updatedA) {
          updated_note = `${LabelForSeriesB} updated on ${updatedB}`
        } else { updated_note = `${LabelForSeriesA} updated on ${updatedA}.`}
      } else {
        updated_note = `Updated on ${moment(this.props.data_array[0].updated_date, 'DDMMMYYYY').utc().format('MM-DD-YYYY')}.`
      }
      return (
        <p className="caption"> 
          {`${config.footnote} ${updated_note}`}
        </p> 
      );
    }

    const chartData = {
      labels: x_axis_values,
      datasets: [
        {
          label: LabelForSeriesA,
          data: data_valuesA,
          backgroundColor: '#3668c2',
        },
        {
          label: LabelForSeriesB,
          data: data_valuesB,
          backgroundColor: '#9a9a9a',
        },
      ],
    };

    const chartOptions = {
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: y_axis_label,
            fontSize: 14,
          },
          ticks: {
            maxTicksLimit: 15,
            beginAtZero: true,
            userCallback: function(value) {
              return parseFloat(value.toFixed(2)).toLocaleString();
            },
            fontSize: 14,
            lineHeight: 16,
          },
          minBarLength: '10px',
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            fontSize: 14,
          },
          ticks: {
            autoSkip: false,
            fontSize: 14,
            lineHeight: 16,
          },
        }],
      },
      maintainAspectRatio: false,
      tooltips: {
        mode: 'index',
        callbacks : {
          label: function(tooltipItem, data) {
            let label = data.datasets[tooltipItem.datasetIndex].label || '';
            if (label) { label += ': '}
            label += Math.round(tooltipItem.yLabel * 1000) / 1000;
            return label;
          },
        },
        titleFontSize: 14,
        bodyFontSize: 14,
      },
      legend: {
        labels: {
          fontSize: 14,
        },
      },
      layout: {
        padding: {
          top: 10,
          bottom: 0,
          left: 0,
          right: 0,
        }
      },
    };

    return (
      <div className="Graph">
        <h4 className="ChartTitle">
          {chartTitle + ' - '}
          <button className="modalOpen" aria-label="Open modal to view data table" title="Open modal to view data table" onClick={this.onModalButtonClick}>View Data Table</button>
        </h4>
        <Bar 
          data={chartData}
          options={chartOptions}
        />
        <Modal 
          modalOpen={this.state.modalOpen} 
          closeModal={this.closeModal} 
          labels={x_axis_values}
          LabelForSeriesA={LabelForSeriesA}
          LabelForSeriesB={LabelForSeriesB}
          data_valuesA={data_valuesA}
          data_valuesB={data_valuesB}
          title={chartTitle}
          ytd_disclaimer={ytd_disclaimer}
        />
        {constructFootnote()}
      </div>
    )
  }
};

export default withRouter(ComparisonGraph);