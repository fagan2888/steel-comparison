import 'babel-polyfill';
import { RECEIVE_FAILURE, RECEIVE_RESULTS, REQUEST_RESULTS } from '../constants';

export function results(state = {
  isFetching: false,
  error: '',
  dashboardData: {},
  timePeriods: [],
  query: {}
}, action) {
  switch (action.type) {
  case REQUEST_RESULTS:
    return Object.assign({}, state, {
      error: '',
      isFetching: true
    });
  case RECEIVE_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error
    });
  case RECEIVE_RESULTS:
    return Object.assign({}, state, {
      isFetching: false,
      dashboardData: action.results.dashboard_data,
      timePeriods: action.results.time_periods,
      query: action.results.query
    });
  default:
    return state;
  }
}
