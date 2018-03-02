import fetch from 'isomorphic-fetch';
import { stringify } from 'querystring';
import { isEmpty, omit, values, has, map, startCase, compact } from '../utils/lodash';
import { SET_FORM_OPTIONS, REQUEST_FORM_OPTIONS, SET_TRADE_FLOW_SUBGROUPS, SET_REPORTER_SUBGROUPS } from '../constants';
import config from '../config.js';
import { propComparator } from './sort';
import { receiveFailure } from './results.js';

const { host, apiKey } = config.api.steel;

export function requestOptions() {
  return {
    type: REQUEST_FORM_OPTIONS
  };
}

export function setFormOptions(json){
  const flow_types = extractFlowTypes(json.aggregations.flow_types);
  const trade_flows = extractTradeFlows(json.aggregations.trade_flows);
  const return_action = {  
    type: SET_FORM_OPTIONS,
    flow_types: flow_types,
    trade_flows: trade_flows
  };
  return return_action;
}

export function setTradeFlowSubgroups(reporter_countries){
  return {  
    type: SET_TRADE_FLOW_SUBGROUPS,
    reporter_countries: reporter_countries
  };
}

export function setReporterSubgroups(json){
  const partner_countries = extractPartnerCountries(json.aggregations.partners);
  const product_groups = extractOptions(json.aggregations.product_groups);
  return {  
    type: SET_REPORTER_SUBGROUPS,
    partner_countries: partner_countries,
    product_groups: product_groups
  };
}

function reporterSubgroupsNeeded(json, params){
  const { reporter_country, trade_flow } = params;
  const reporter_countries = extractOptions(json.aggregations.reporters);
  const rc_vals = map(reporter_countries, obj => { return obj.value});

  return (dispatch) => {
    dispatch(setTradeFlowSubgroups(reporter_countries));
    if(rc_vals.includes(reporter_country)){
      dispatch(requestReporterSubgroups(trade_flow, reporter_country));
    }
  }
}

export function requestFormOptions(){
  return fetchResults('', setFormOptions);
}

export function requestTradeFlowSubgroups(trade_flow, reporter_country){
  const query = 'trade_flow=' + trade_flow;
  return fetchResults(query, reporterSubgroupsNeeded, {reporter_country: reporter_country, trade_flow: trade_flow});
}

export function requestReporterSubgroups(trade_flow, reporter_country){
  const query = 'trade_flow=' + trade_flow + '&reporter_countries=' + reporter_country;
  return fetchResults(query, setReporterSubgroups, {});
}

function fetchResults(query, callback, params){
  return (dispatch) => {
    dispatch(requestOptions());
    return fetch(`${host}?api_key=${apiKey}&size=1&${query}`)
        .then(response => response.json())
        .then(json => dispatch(callback(json, params)))
        .catch((error) => {
          dispatch(receiveFailure('There was an error connecting to the data source:  ' + error ));
        });
  };
}

function extractOptions(aggregations){
  let options = map(aggregations, obj => { 
    return {label: obj['key'], value: obj['key']};
  }).sort(propComparator('value', 'asc'));

  return options;
}

function extractPartnerCountries(partners){
  let world_option = {};
  let partner_countries = compact(map(partners, obj => { 
    if (obj['key'] === 'World'){
      world_option = {label: 'All Countries', value: obj['key']};
      return null;
    }
    else
      return {label: obj['key'], value: obj['key']}; 
  })).sort(propComparator('value', 'asc'));

  if (!isEmpty(world_option))
    partner_countries.unshift(world_option);

  return partner_countries;
}

function extractTradeFlows(trade_flow_options){
  let trade_flows = map(trade_flow_options, obj => {
    const label = obj['key'] === 'IMP' ? 'Imports' : 'Exports';
    return {label: label, value: obj['key']};
  }).sort(propComparator('value', 'asc'));

  return trade_flows;
}

function extractFlowTypes(flow_type_options){
  let flow_types = map(flow_type_options, obj => { 
    const label = obj['key'] === 'QTY' ? 'Quantity (Metric Tons)' : 'Value (US Dollars)';
    return {label: label, value: obj['key']}; 
  }).sort(propComparator('value', 'asc'));

  return flow_types;
}