import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { camelCase, isEmpty, map, omit, omitBy, reduce, snakeCase } from '../utils/lodash';
import { stringify } from 'querystring';
import { Form, Spinner, DownloadButton, YearlyBarGraph, ComparisonBarGraphs, PieGraphs } from '../components';
import { fetchAggResultsIfNeeded, pageResults, requestFormOptions } from '../actions';
import './App.scss';

class App extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(requestFormOptions());
  }

  componentDidMount() {
    const { dispatch, query } = this.props;
    dispatch(fetchAggResultsIfNeeded(query));
  }

  handleSubmit = (form) => {
    const params = reduce(omitBy(form, isEmpty), (result, value, _key) => {
      const key = snakeCase(_key);
      return Object.assign(
        result, { [key]: Array.isArray(value) ? map(value, 'value').join(',') : value });
    }, {});
    this.props.dispatch(fetchAggResultsIfNeeded(params));
    this.push(params);
  }

  push(params) {
    this.props.history.push(`?${stringify(params)}`);
  }

  render() {
    const { query, results, form_options } = this.props;
    const formValues = reduce(
      query,
      (result, value, key) => Object.assign(result, { [camelCase(key)]: value }),
      {});
    let message, yearly, comparisons, pies, download_button;
    if (results.isFetchingAggs) message = null;
    else if (results.error != "") 
      message = <div className="explorer__result">{results.error}</div>;
    else if (isEmpty(results.dashboardData))
      message = <h3> Choose a search option from each field to generate a report </h3>;
    else  {
      yearly = <YearlyBarGraph result={results.dashboardData} params={query} />;
      comparisons = <ComparisonBarGraphs result={results.dashboardData} query={query} form_options={form_options.timePeriods} />;
      pies = <PieGraphs result={results.dashboardData} query={query} form_options={form_options.timePeriods} />
      download_button = <DownloadButton results={results.dashboardData} />
    }

    return (
      <div className="explorer pure-g">

        <div className="form__content pure-u-1 pure-u-xl-1-2 first_row">
          <h1 className="Header-1"><b>Global Steel Trade Monitor</b></h1>
          <p className="DefaultParagraph-1">Search for steel trade data by first selecting Imports or Exports.  All fields are required.</p>
      
          <Form onSubmit={this.handleSubmit} initialValues={formValues} formOptions={form_options} dispatch={this.props.dispatch}/>
          <Spinner active={results.isFetchingAggs} />
          {message}
          {download_button}
        </div>

        {yearly}
        {comparisons}
        {pies}

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
  const query = ownProps.history.getCurrentLocation().query;
  const { results, form_options } = state;
  return {
    query,
    results,
    form_options
  };
}

export default connect(mapStateToProps)(App);
