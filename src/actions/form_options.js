import fetch from 'isomorphic-fetch';
import { stringify } from 'querystring';
import { isEmpty, omit, values, has, map, startCase } from '../utils/lodash';
import { SET_FORM_OPTIONS, SET_SUB_GROUPS } from 'constants';
import config from '../config.js';
import { propComparator } from './sort_reports';
import { receiveFailure } from './results.js';

const { host, apiKey } = config.api.steel;

export function setFormOptions(options){
  let reporter_countries = map(options.aggregations.reporters, obj => { 
    return optionObject(obj['key']);
  }).sort(propComparator('value', 'asc'));

  let partner_countries = map(options.aggregations.partners, obj => { 
    return optionObject(obj['key']); 
  }).sort(propComparator('value', 'asc'));

  let product_groups = map(options.aggregations.product_groups, obj => { 
    return optionObject(obj['key']); 
  }).sort(propComparator('value', 'asc'));

  let flow_types = map(options.aggregations.flow_types, obj => { 
    return optionObject(obj['key']); 
  }).sort(propComparator('value', 'asc'));

  let time_periods = map(extractTimePeriods(options.results[0]), time_period => {
    return {label: startCase(time_period), value: time_period}
  });

  return {  
    type: SET_FORM_OPTIONS,
    reporter_countries: reporter_countries,
    partner_countries: partner_countries,
    product_groups: product_groups,
    flow_types: flow_types,
    time_periods: time_periods
  };
}

export function setSubGroups(options){
  let partner_countries = map(options.aggregations.partners, obj => { 
    return optionObject(obj['key']); 
  }).sort(propComparator('value', 'asc'));

  let product_groups = map(options.aggregations.product_groups, obj => { 
    return optionObject(obj['key']); 
  }).sort(propComparator('value', 'asc'));

  return {  
    type: SET_SUB_GROUPS,
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

export function requestSubGroups(reporter_country){
  const query = 'reporter_countries=' + reporter_country;

  return (dispatch) => {
    return fetch(`${host}?api_key=${apiKey}&size=1&${query}`)
        .then(response => response.json())
        .then(json => dispatch(setSubGroups(json)))
        .catch((error) => {
          dispatch(receiveFailure('There was an error connecting to the data source: ' + error));
        });;
  };
}

function extractTimePeriods(result){
  const time_periods = [];
  for (let key in result){
    if (/[0-9]{4}/.test(key))
      time_periods.push(key);
  }
  return time_periods;
}

function optionObject(val){
  return {label: val, value: val}
}