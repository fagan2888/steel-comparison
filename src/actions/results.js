import fetch from 'isomorphic-fetch';
import { stringify } from 'querystring';
import { isEmpty, omit, values, has } from '../utils/lodash';
import { buildAggResults } from './build_agg_results.js';
import { buildReports } from './build_reports.js';
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

function aggregateResults(json, querystring, params, offset, agg_results) {
  // 10k is the max offset that can be reached in Elasticsearch for now:
  //if(json.total >= 10000) return receiveAggResults({results: []});
  if(json.total >= 10000) return receiveFailure('Too many results; enter fewer countries, world regions, or groups to limit the number of reports.');
  
  agg_results.results = buildAggResults(json.results, agg_results.results, params);
  agg_results.total += json.results.length;
  // Fetch next batch of results if needed:
  if(agg_results.total < json.total)
    return fetchAggResults(querystring, params, offset+100, agg_results);
  
  agg_results.results = buildReports(agg_results.results, params);

  return receiveAggResults(agg_results);
}

const { host, apiKey } = config.api.steel;
function fetchAggResults(querystring, params, offset = 0, aggregated_results = {}) {
  return (dispatch) => {
    dispatch(requestAggResults(querystring));
    return fetch(`${host}?api_key=${apiKey}&size=100&offset=${offset}&${querystring}`)
      .then(response => response.json())
      .then(json => dispatch(aggregateResults(json, querystring, params, offset, aggregated_results)))
      //.catch((error) => {
      //  dispatch(receiveFailure('There was an error retrieving results from the data source.'));
      //});
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
      return dispatch(receiveAggResults({results: []})); // Don't return anything if no query is entered
    if(shouldFetchResults(getState())){
      const agg_results = {results: [], total: 0}
      return dispatch(fetchAggResults(stringify(params), params, 0, agg_results));
    }

    return Promise.resolve([]);
  };
}

function buildQueryString(params) {
  params = filterSelectValues(params);

  if (params.start_date && params.percent_change) {
    const date_range = calculateDateRange(moment(params.start_date), params.percent_change);
    Object.assign(params, { date: date_range });
  }
  return stringify(omit(params, ['start_date', 'percent_change', 'select_options']));
}

function filterSelectValues(params) {
  if (params.select_options == 'countries'){
    params.world_regions = '';
    params.ntto_groups = '';
  }
  else if (params.select_options == 'worldRegions'){
    params.countries = '';
    params.ntto_groups = '';
  }
  else if (params.select_options == 'nttoGroups'){
    params.world_regions = '';
    params.countries = '';
  }
  return params;
}
