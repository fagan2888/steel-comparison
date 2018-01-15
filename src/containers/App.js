import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { camelCase, isEmpty, map, omit, omitBy, reduce, snakeCase, values } from '../utils/lodash';
import { stringify } from 'querystring';
import { DashboardForm, Spinner, YearlyBarGraph, ComparisonBarGraphs, PieGraphs } from '../components';
import { fetchResultsIfNeeded, requestFormOptions, requestTradeFlowSubgroups, requestReporterSubgroups } from '../actions';
import './App.scss';
import config from '../config.js';

class App extends React.Component {
  componentWillMount() {
    const { dispatch, query } = this.props;
    dispatch(requestFormOptions());
    dispatch(requestTradeFlowSubgroups(query.trade_flow));
    dispatch(requestReporterSubgroups(query.trade_flow, query.reporter_countries));
  }

  componentDidMount() {
    const { dispatch, query } = this.props;
    dispatch(fetchResultsIfNeeded(query));
  }

  handleSubmit = (form) => {
    const params = reduce(omitBy(form, isEmpty), (result, value, _key) => {
      const key = snakeCase(_key);
      return Object.assign(
        result, { [key]: Array.isArray(value) ? map(value, 'value').join(',') : value });
    }, {});
    this.props.dispatch(fetchResultsIfNeeded(params));
    this.push(params);
  }

  push(params) {
    this.props.history.push(`?${stringify(params)}`);
  }

  render() {
    const { query, results, form_options } = this.props;
    const form_values = reduce(
      query,
      (result, value, key) => Object.assign(result, { [camelCase(key)]: value }),
      {});
    let message, yearly, comparisons, pies, download_button;
    if (results.isFetching || isEmpty(results.dashboardData)) 
      message = null;
    else if (results.error != "") 
      message = <div className="explorer__result">{results.error}</div>;
    else {
      yearly = <YearlyBarGraph data={results.dashboardData} query={results.query} />;
      comparisons = <ComparisonBarGraphs data={results.dashboardData} query={results.query} form_options={results.timePeriods} />;
      pies = <PieGraphs data={results.dashboardData} query={results.query} form_options={results.timePeriods} />
    }

    return (
      <div className="explorer pure-g">

        <div className="pure-u-1 pure-u-xl-1-2 explorer__first-row">
          <div className="explorer__form-content">
            <h1 className="Header-1"><a href={config.monitor_link} target="_blank"><b>Global Steel Trade Monitor</b></a></h1>
            <p className="DefaultParagraph-1">
              Search for steel trade data from the perspective of the importing or exporting country (Reporting Country).
              First select a Trade Flow, then Reporting Country, Partner Country, Product Group, and Quantity or Value.
              Click Generate Dashboard to update the graphs and downloadable data.  
            </p>
            <p> <b>All fields are required.</b> <span className="explorer__faqs-link"><a href={config.faqs_link} target="_blank"><b>FAQs</b></a></span> </p>
            
            <DashboardForm onSubmit={this.handleSubmit} initialValues={form_values} formOptions={form_options} dispatch={this.props.dispatch} results={results}/>

            <Spinner active={results.isFetching} />
            {message}
          </div>
        </div>

        {yearly}
        {comparisons}
        {pies}

        <div className="explorer__dashboard-footnote">
          <button className="explorer__button explorer__link-button pure-button pure-button-primary" type="button" onClick={() => {return window.open(config.monitor_link, '_blank')}} >
            Return to Global Steel Trade Reports
          </button>
          <p> For Questions </p>
          <p> Steel Import Monitoring and Analysis Team
          <br/> Email: <a href="mailto:ecglobalsteelstats@trade.gov">ecglobalsteelstats@trade.gov</a>  Call: (202) 482-2105</p>
        </div>
      </div>
    );
  }
}
App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  results: PropTypes.object,
  form_options: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  let query = ownProps.history.getCurrentLocation().query;
  if (isEmpty(ownProps.history.getCurrentLocation().query)){
    query = {flow_type: "QTY", partner_countries: "World", product_groups: "All Steel Mill Products", reporter_countries: "United States", trade_flow: "IMP" };
  }
  const { results, form_options } = state;

  /*
  May revisit this later... can the form values be changed prior to render based on the form options? 

  const reporter_countries = map(form_options.reporterCountries, obj => { return obj.value});
  const partner_countries = map(form_options.partnerCountries, obj => { return obj.value});
  const product_groups = map(form_options.productGroups, obj => { return obj.value});

  if (!isEmpty(reporter_countries) && !reporter_countries.includes(query.reporter_countries))
    query.reporter_countries = null;
  if (!isEmpty(partner_countries) && !partner_countries.includes(query.partner_countries))
    query.partner_countries = null;
  if (!isEmpty(product_groups) && !product_groups.includes(query.product_groups))
    query.product_groups = null;
  */

  return {
    query,
    results,
    form_options
  };
}

export default connect(mapStateToProps)(App);
