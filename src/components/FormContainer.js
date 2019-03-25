import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Form from './Form';
import config from '../config';
import { map, compact, isEmpty } from 'lodash';
import { propComparator } from '../utils/sort';
import './App.css';

class FormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comparisonType: "",
      ReporterOptions: [],
      PartnerOptions: [],
      ProductGroupOptions: [],
      loadingForm: false,
    }
    this.handleChangeComparisonType = this.handleChangeComparisonType.bind(this);
  }

  handleChangeComparisonType(event) {
    this.setState({ comparisonType: event.target.value });
  }

  async componentDidMount() {
    this.setState({ loadingForm: true })
    const tradeResponse = await this.props.tradeRepository._getAggregations();
    this.setState({
      loadingForm: false,
      PartnerOptions: this.extractPartnerCountries(tradeResponse.aggregations.partners),
      ReporterOptions: this.extractOptions(tradeResponse.aggregations.reporters),
      ProductGroupOptions: this.extractOptions(tradeResponse.aggregations.product_groups),
    })
  };

  extractOptions(aggregations) {
    let options = map(aggregations, obj => {
      return { label: obj['key'], value: obj['key'] };
    }).sort(propComparator('value', 'asc'));
    return options;
  };

  extractPartnerCountries(partners) {
    let world_option = {};
    let partner_countries = compact(map(partners, obj => {
      if (obj['key'] === 'World') {
        world_option = { label: 'All Countries', value: obj['key'] };
        return null;
      }
      else
        return { label: obj['key'], value: obj['key'] };
    })).sort(propComparator('value', 'asc'));

    if (!isEmpty(world_option))
      partner_countries.unshift(world_option);

    return partner_countries;
  };

  render() {
    return (
      <div>
        <h1 className="Header-1"><a href={config.monitor_link} target="_blank" rel="noopener noreferrer"><b>Global Steel Trade Monitor Comparison Dashboard</b></a></h1>
        <p className="DefaultParagraph-1">
          Search for and compare steel trade for multiple Reporting Countries, Partner Countries, Product Groups, or Trade Flows. Click Generate Dashboard to update the graphs.
        </p>
        <p>
          Compare trade data between two or more reporter countries, partner countries or product groups. Please select the way that you would like to compare the information.
        </p>
        <fieldset onChange={this.handleChangeComparisonType} id="comparisonType">
          <legend>Select a type of comparison:</legend>
          <input type="radio" name="comparisonType" value="Reporting Countries" id="two-reporting-countries" />
          <label htmlFor="two-reporting-countries">Two Reporting Countries</label><br />

          <input type="radio" name="comparisonType" value="Partner Countries" id="two-partner-countries" />
          <label htmlFor="two-partner-countries">Two Partner Countries</label><br />

          <input type="radio" name="comparisonType" value="Product Groups" id="two-product-groups" />
          <label htmlFor="two-product-groups">Two Product Groups</label><br />

          <input type="radio" name="comparisonType" value="Trade Flows" id="two-trade-flows" />
          <label htmlFor="two-trade-flows">Two Trade Flows</label><br />
        </fieldset>
        {this.state.comparisonType ?
          <Form
            comparisonType={this.state.comparisonType}
            tradeRepository = {this.props.tradeRepository}
            ReporterOptions={this.state.ReporterOptions}
            PartnerOptions={this.state.PartnerOptions}
            ProductGroupOptions={this.state.ProductGroupOptions}
            loadingForm={this.state.loadingForm}
          />
          : null}
      </div>
    );
  }
}

export default withRouter(FormContainer);
