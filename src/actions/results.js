import fetch from 'isomorphic-fetch';
import { stringify } from 'querystring';
import { isEmpty, omit, values, has } from '../utils/lodash';
import { REQUEST_AGG_RESULTS, RECEIVE_FAILURE, PAGE_RESULTS, RECEIVE_AGG_RESULTS } from 'constants';
import config from '../config.js';
import moment from 'moment';

export function requestAggResults() {
  return {
    type: REQUEST_AGG_RESULTS,
  };
}

export function receiveFailure(error) {
  return {
    type: RECEIVE_FAILURE,
    error,
  };
}

export function pageResults(offset) {
  return {
    type: PAGE_RESULTS,
    offset,
  };
}

export function receiveAggResults(payload) {
  return {
    type: RECEIVE_AGG_RESULTS,
    payload,
  };
}

function aggregateResults(json, params, offset, agg_results) {
  
  const results = {};
  results.product_group_entry = json[0].results;
  results.partner_country_entry = json[1].results;

  if (results.product_group_entry.length == 0 && results.partner_country_entry == 0)
    return receiveFailure('No results found for this Trade Flow and Reporter Country combination.' );
  else if (results.partner_country_entry == 0)
    return receiveFailure('No results found for this Reporter and Partner Country combination.' );
  else if (results.product_group_entry.length == 0)
    return receiveFailure('No results found for this Reporter Country and Product Group combination.' );

  results.reporter_country = params.reporter_countries;
  results.source_last_updated = json[1].sources_used[0].source_last_updated;

  return receiveAggResults(results);
}

const { host, apiKey } = config.api.steel;
function fetchAggResults(params, offset = 0, aggregated_results = {}) {
  return (dispatch) => {
    dispatch(requestAggResults());
    const product_group_querystring = stringify(omit(params, ['partner_countries', 'comparison_interval_start', 'comparison_interval_end', 'pie_period']));
    const partner_country_querystring = stringify(omit(params, ['product_groups', 'comparison_interval_start', 'comparison_interval_end', 'pie_period']));
    const requests = [
      fetch(`${host}?api_key=${apiKey}&size=100&offset=${offset}&${product_group_querystring}`).then(response => response.json()),
      fetch(`${host}?api_key=${apiKey}&size=100&offset=${offset}&${partner_country_querystring}`).then(response => response.json()) ];

    return Promise.all(requests)
      .then(json => dispatch(aggregateResults(json, params, offset, aggregated_results)))
      .catch((error) => {
        dispatch(receiveFailure('There was an error retrieving results from the data source:  ' + error ));
      });
  };
}

function shouldFetchResults(state) {
  const { results } = state;
  if (!results) {
    return true;
  } else if (results.isFetchingAggs) {
    return false;
  }
  return true;
}

export function fetchAggResultsIfNeeded(params) {
  return (dispatch, getState) => {
    if (isEmpty(omit(params, ['offset', 'size'])))
      return dispatch(receiveAggResults({})); // Don't return anything if no query is entered
    if(shouldFetchResults(getState())){
      const agg_results = {results: [], total: 0}
      return dispatch(fetchAggResults(params, 0, agg_results));
    }

    return Promise.resolve([]);
  };
}
