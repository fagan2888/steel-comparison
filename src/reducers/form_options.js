import 'babel-polyfill';
import { SET_FORM_OPTIONS } from 'constants';

export function form_options(state = {
  reporterCountries: [],
  partnerCountries: [],
  productGroups: []
}, action) {
  switch (action.type) {
  case SET_FORM_OPTIONS:
    return Object.assign({}, state, {
      reporterCountries: action.reporter_countries,
      partnerCountries: action.partner_countries,
      productGroups: action.product_groups
    });
  default:
    return state;
  }
}