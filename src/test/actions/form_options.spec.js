import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import config from '../../config';
import * as actions from '../../actions/form_options';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialize_store = {
  isFetching: false,
  reporterCountries: [],
  partnerCountries: [],
  productGroups: [],
  flowTypes: [],
  tradeFlows: []
};

const form_options_response = {
  aggregations: {
    trade_flows: [{key: 'EXP'}, {key: 'IMP'}],
    flow_types: [{key: 'VALUE'}, {key: 'QTY'}]
  }
};

const trade_flow_response = {
  aggregations: {
    reporters: [{key: 'United States'}, {key: 'China'}]
  }
};
const reporter_response = {
  aggregations: {
    partners: [{key: 'Canada'}, {key: 'Mexico'}],
    product_groups: [{key: 'Flat Products'}, {key: 'Long Products'}]
  }
};

const { host, apiKey } = config.api.steel;

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('set trade flow and flow type options', () => {
    nock(host)
      .get(`?api_key=${apiKey}&size=1&`)
      .reply(200, form_options_response);

    const store = mockStore(initialize_store);
    const expected_actions = [
      {
        type: 'explorer/REQUEST_FORM_OPTIONS'
      },
      {
        type: 'explorer/SET_FORM_OPTIONS',
        trade_flows: [{label: 'Exports', value: 'EXP'}, {label: 'Imports', value: 'IMP'}],
        flow_types: [{label: 'Quantity (Metric Tons)', value: 'QTY'}, {label: 'Value (US Dollars)', value: 'VALUE'}]
      }
    ];
    return store.dispatch(actions.requestFormOptions()).then(() => {
      expect(store.getActions()).toEqual(expected_actions);
    });
  });
  
  it('set reporter country options from trade flow', () => {
    nock(host)
      .get(`?api_key=${apiKey}&size=1&trade_flow=IMP`)
      .reply(200, trade_flow_response);

    const store = mockStore(initialize_store);
    const expected_actions = [
      {
        type: 'explorer/REQUEST_FORM_OPTIONS'
      },
      {
        type: 'explorer/SET_TRADE_FLOW_SUBGROUPS',
        reporter_countries: [{label: 'China', value: 'China'}, {label: 'United States', value: 'United States'}]
      }
    ];
    return store.dispatch(actions.requestTradeFlowSubgroups('IMP')).then(() => {
      expect(store.getActions()).toEqual(expected_actions);
    });
  });

  it('set partner and product groups options from trade flow and reporter', () => {
    nock(host)
      .get(`?api_key=${apiKey}&size=1&trade_flow=IMP&reporter_countries=China`)
      .reply(200, reporter_response);

    const store = mockStore(initialize_store);
    const expected_actions = [
      {
        type: 'explorer/REQUEST_FORM_OPTIONS'
      },
      {
        type: 'explorer/SET_REPORTER_SUBGROUPS',
        partner_countries: [{label: 'Canada', value: 'Canada'}, {label: 'Mexico', value: 'Mexico'}],
        product_groups: [{label: 'Flat Products', value: 'Flat Products'}, {label: 'Long Products', value: 'Long Products'}]
      }
    ];

    return store.dispatch(actions.requestReporterSubgroups('IMP', 'China')).then(() => {
      expect(store.getActions()).toEqual(expected_actions);
    });
  });
  
});