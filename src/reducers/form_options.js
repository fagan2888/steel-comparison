import 'babel-polyfill';
import { SET_FORM_OPTIONS,SET_TRADE_FLOW_SUBGROUPS, SET_REPORTER_SUBGROUPS, REQUEST_FORM_OPTIONS } from '../constants';

export function form_options(state = {
  isFetching: false,
  reporterCountries: [],
  partnerCountries: [],
  productGroups: [],
  flowTypes: [],
  tradeFlows: []
}, action) {
  switch (action.type) {
  case REQUEST_FORM_OPTIONS:
    return Object.assign({}, state, {
      isFetching: true
    });
  case SET_FORM_OPTIONS:
    return Object.assign({}, state, {
      isFetching: false,
      flowTypes: action.flow_types,
      tradeFlows: action.trade_flows
    });
  case SET_TRADE_FLOW_SUBGROUPS:
    return Object.assign({}, state, {
      isFetching: false,
      reporterCountries: action.reporter_countries
    });
  case SET_REPORTER_SUBGROUPS:
    return Object.assign({}, state, {
      isFetching: false,
      partnerCountries: action.partner_countries,
      productGroups: action.product_groups
    });
  default:
    return state;
  }
}