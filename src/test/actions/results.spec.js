import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import config from '../../config';
import * as actions from '../../actions/results';
import product_group_response from './results/product_group_api_result.js';
import partner_country_response from './results/partner_country_api_result.js';
import expected_results from './results/expected_results.js';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialize_store = {
  isFetching: false,
  error: '',
  dashboardData: {},
  timePeriods: [],
  query: {}
};

const { host, apiKey } = config.api.steel;

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates RECEIVE_RESULTS after building dashboard data', () => {
    nock(host)
      .get(`?api_key=${apiKey}&size=100&offset=0&flow_type=QTY&partner_countries=World&reporter_countries=United%20States&trade_flow=IMP`)
      .reply(200, partner_country_response)
      .get(`?api_key=${apiKey}&size=100&offset=0&flow_type=QTY&product_groups=All%20Steel%20Mill%20Products&reporter_countries=United%20States&trade_flow=IMP`)
      .reply(200, product_group_response);

    const store = mockStore(initialize_store);
    const params =  { flow_type: 'QTY', partner_countries: 'World', product_groups: 'All Steel Mill Products', reporter_countries: 'United States', trade_flow: 'IMP' };
    const expected_actions =  [ 
      { type: 'explorer/REQUEST_RESULTS' },
      { type: 'explorer/RECEIVE_RESULTS',
        results: expected_results } 
    ];
    
    return store.dispatch(actions.fetchResultsIfNeeded(params)).then(() => {
      expect(JSON.stringify(store.getActions())).toEqual(JSON.stringify(expected_actions));
    });
  });
});