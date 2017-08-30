import fetch from 'isomorphic-fetch';
import { stringify } from 'querystring';
import { isEmpty, omit, values, has, map, startCase, compact } from '../utils/lodash';
import { SET_FORM_OPTIONS, SET_TRADE_FLOW_SUB_GROUPS, SET_REPORTER_SUB_GROUPS } from 'constants';
import config from '../config.js';
import { propComparator } from './sort_reports';
import { receiveFailure } from './results.js';

const { host, apiKey } = config.api.steel;

export function setFormOptions(options){
  const reporter_countries = extractOptions(options.aggregations.reporters);
  const partner_countries = extractPartnerCountries(options.aggregations.partners);
  const product_groups = extractOptions(options.aggregations.product_groups);
  const flow_types = extractFlowTypes(options.aggregations.flow_types);
  const trade_flows = extractTradeFlows(options.aggregations.trade_flows);

  let time_periods = map(extractTimePeriods(options.results[0]), time_period => {
    return {label: startCase(time_period.replace('sum_', '')).toUpperCase(), value: time_period}
  });

  return {  
    type: SET_FORM_OPTIONS,
    reporter_countries: reporter_countries,
    partner_countries: partner_countries,
    product_groups: product_groups,
    flow_types: flow_types,
    time_periods: time_periods,
    trade_flows: trade_flows
  };
}

export function setTradeFlowSubGroups(options){
  const partner_countries = extractPartnerCountries(options.aggregations.partners);
  const product_groups = extractOptions(options.aggregations.product_groups);
  const reporter_countries = extractOptions(options.aggregations.reporters);

  return {  
    type: SET_TRADE_FLOW_SUB_GROUPS,
    partner_countries: partner_countries,
    product_groups: product_groups,
    reporter_countries: reporter_countries
  };
}

export function setReporterSubGroups(options){
  const partner_countries = extractPartnerCountries(options.aggregations.partners);
  const product_groups = extractOptions(options.aggregations.product_groups);

  return {  
    type: SET_REPORTER_SUB_GROUPS,
    partner_countries: partner_countries,
    product_groups: product_groups
  };
}

export function requestFormOptions(){
  return (dispatch) => {
    return fetch(`${host}?api_key=${apiKey}&size=1`)
        .then(response => response.json())
        .then(json => dispatch(setFormOptions(json)))
        .catch((error) => {
          dispatch(receiveFailure('There was an error connecting to the data source: ' + error));
        });;
  };
}

export function requestTradeFlowSubGroups(trade_flow){
  const query = 'trade_flow=' + trade_flow;
  return (dispatch) => {
    return fetch(`${host}?api_key=${apiKey}&size=1&${query}`)
        .then(response => response.json())
        .then(json => dispatch(setTradeFlowSubGroups(json)))
        .catch((error) => {
          dispatch(receiveFailure('There was an error connecting to the data source: ' + error));
        });;
  };
}

export function requestReporterSubGroups(trade_flow, reporter){
  const query = 'reporter_countries=' + reporter + '&trade_flow=' + trade_flow;
  return (dispatch) => {
    return fetch(`${host}?api_key=${apiKey}&size=1&${query}`)
        .then(response => response.json())
        .then(json => dispatch(setReporterSubGroups(json)))
        .catch((error) => {
          dispatch(receiveFailure('There was an error connecting to the data source: ' + error));
        });;
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
    if (obj['key'] === "World"){
      world_option = {label: "All Countries", value: obj['key']};
      return null;
    }
    else
      return {label: obj['key'], value: obj['key']}; 
  })).sort(propComparator('value', 'asc'));
  partner_countries = compact(partner_countries);
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

function extractTimePeriods(result){
  const time_periods = [];
  for (let key in result){
    if (/[0-9]{4}/.test(key))
      time_periods.push(key);
  }
  return time_periods;
}