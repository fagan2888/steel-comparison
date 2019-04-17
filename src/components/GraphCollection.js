import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ComparisonGraph from './ComparisonGraph';
import Loader from 'react-loader-spinner';

class GraphCollection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: null,
      product_groups: null,
      total: 0,
      loadingResults: false,
      message: null,
    }
  }

  async componentDidUpdate(prevProps) {
    if ((this.props.submitted !== prevProps.submitted) || (this.props.comparisonType !== prevProps.comparisonType)) {
      this.setState({
        results: null,
        product_groups: null,
        total: 0,
        loadingResults: false,
        message: null,
      });
    }

    if (this.props.location.search !== prevProps.location.search) {
      this.setState({ loadingResults: true, total: 0, message: null });
      const tradeResponse = await this.props.tradeRepository._getData(this.props.location.search);
      if (tradeResponse.total === 0) {
        this.setState({ message: 'No results were found for this query.', loadingResults: false })
      } else {
        this.setState({
          results: tradeResponse.results,
          total: tradeResponse.total,
          product_groups: tradeResponse.aggregations.product_groups,
          loadingResults: false,
        });
      }
    }
  }

  aggregateByProductGroup = (results_array) => {
    let paired_results = [];

    if (this.props.comparisonType === "Product Groups") {
      paired_results.push(results_array);
      return paired_results; // return an array containing one nested array
    } else {
      this.state.product_groups.forEach(function (item) {
        paired_results.push(results_array.filter(entry => entry.product_group === item["key"]));
      })
      return paired_results; // return an array containing 6 nested arrays
    }
  }

  render() {

    let dataset_label_key;
    switch (this.props.comparisonType) {
      case 'Product Groups':
        dataset_label_key = 'product_group';
        break;
      case 'Reporting Countries':
        dataset_label_key = 'reporter_country';
        break;
      case 'Partner Countries':
        dataset_label_key = 'partner_country';
        break;
      case 'Trade Flows':
        dataset_label_key = 'trade_flow';
        break;
      default:
        dataset_label_key = null;
        return dataset_label_key
    };

    let paired_results_array = [];
    if (this.state.results) {
      paired_results_array = this.aggregateByProductGroup(this.state.results)
    }

    return (
      <div className="GraphCollection">

        {this.state.loadingResults ? (<div className="spinnerForCharts"><Loader type="RevolvingDot" color="#0071bc" width="100" /></div>) : null}

        {((this.props.submitted) && (this.state.total > 0)) ? (
          paired_results_array.map((r, i) => <ComparisonGraph key={i} data_array={r} dataset_label_key={dataset_label_key} />)
        ) : null}

        {(!this.state.loadingResults && this.state.message && this.state.total === 0) ? (
          <h3 className="message">{this.state.message}</h3>
        ) : null}
      </div>
    )
  }
}

export default withRouter(GraphCollection);