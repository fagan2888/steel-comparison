import 'babel-polyfill';
import { SET_FORM_OPTIONS, REQUEST_FORM_OPTIONS } from 'constants';

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
      isFetching: true,
    });
  case SET_FORM_OPTIONS:
    return Object.assign({}, state, {
      isFetching: false,
      reporterCountries: action.reporter_countries,
      partnerCountries: action.partner_countries,
      productGroups: action.product_groups,
      flowTypes: action.flow_types,
      tradeFlows: action.trade_flows
    });
  default:
    return state;
  }
}