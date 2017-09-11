import fetch from 'isomorphic-fetch';
import { stringify } from 'querystring';
import { isEmpty, omit, values, has, map, startCase, compact } from '../utils/lodash';
import { SET_FORM_OPTIONS, REQUEST_FORM_OPTIONS } from 'constants';
import config from '../config.js';
import { propComparator } from './sort_reports';
import { receiveFailure } from './results.js';

const { host, apiKey } = config.api.steel;

export function requestOptions() {
  return {
    type: REQUEST_FORM_OPTIONS,
  };
}

export function setFormOptions(json){
  const flow_types = extractFlowTypes(json[0].aggregations.flow_types);
  const trade_flows = extractTradeFlows(json[0].aggregations.trade_flows);
  const reporter_countries = extractOptions(json[1].aggregations.reporters);
  const partner_countries = extractPartnerCountries(json[2].aggregations.partners);
  const product_groups = extractOptions(json[2].aggregations.product_groups);

  return {  
    type: SET_FORM_OPTIONS,
    reporter_countries: reporter_countries,
    partner_countries: partner_countries,
    product_groups: product_groups,
    flow_types: flow_types,
    trade_flows: trade_flows
  };
}

export function requestFormOptions(query){
  const trade_flow_query = 'trade_flow=' + query.trade_flow;
  const reporter_query = 'reporter_countries=' + query.reporter_countries + '&trade_flow=' + query.trade_flow;
  return (dispatch) => {
    dispatch(requestOptions());
    const requests = [
      fetch(`${host}?api_key=${apiKey}&size=1`).then(response => response.json()),
      fetch(`${host}?api_key=${apiKey}&size=1&${trade_flow_query}`).then(response => response.json()),
      fetch(`${host}?api_key=${apiKey}&size=1&${reporter_query}`).then(response => response.json())
    ]

    return Promise.all(requests)
      .then(json => dispatch(setFormOptions(json)))
      .catch((error) => {
        dispatch(receiveFailure('There was an error connecting to the data source:  ' + error ));
      });
  }
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