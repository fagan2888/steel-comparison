import { form_options } from '../../reducers/form_options'
import * as types from '../../constants'

describe('form options reducer', () => {
  it('should return the initial state', () => {
    expect(form_options(undefined, {})).toEqual(
      {
        isFetching: false,
        reporterCountries: [],
        partnerCountries: [],
        productGroups: [],
        flowTypes: [],
        tradeFlows: []
      }
    )
  })

  it('should handle REQUEST_FORM_OPTIONS', () => {
    expect(
      form_options({}, {
        type: types.REQUEST_FORM_OPTIONS
      })
    ).toEqual(
      {
        isFetching: true
      }
    )
  })

  it('should handle SET_FORM_OPTIONS', () => {
    expect(
      form_options({}, {
        type: types.SET_FORM_OPTIONS,
        trade_flows: [{label: 'Exports', value: 'EXP'}, {label: 'Imports', value: 'IMP'}],
        flow_types: [{label: 'Value (US Dollars)', value: 'VALUE'}, {label: 'Quantity (Metric Tons)', value: 'QTY'}]
      })
    ).toEqual(
      {
        isFetching: false,
        flowTypes: [{label: 'Value (US Dollars)', value: 'VALUE'}, {label: 'Quantity (Metric Tons)', value: 'QTY'}],
        tradeFlows: [{label: 'Exports', value: 'EXP'}, {label: 'Imports', value: 'IMP'}]
      }
    )
  })

  it('should handle SET_TRADE_FLOW_SUBGROUPS', () => {
    expect(
      form_options({}, {
        type: types.SET_TRADE_FLOW_SUBGROUPS,
        reporter_countries: [{label: 'United States', value: 'United States'}, {label: 'China', value: 'China'}]
      })
    ).toEqual(
      {
        isFetching: false,
        reporterCountries: [{label: 'United States', value: 'United States'}, {label: 'China', value: 'China'}]
      }
    )
  })

  it('should handle SET_REPORTER_SUBGROUPS', () => {
    expect(
      form_options({}, {
        type: types.SET_REPORTER_SUBGROUPS,
        partner_countries: [{label: 'Exports', value: 'EXP'}, {label: 'Imports', value: 'IMP'}],
        product_groups: [{label: 'Value (US Dollars)', value: 'VALUE'}, {label: 'Quantity (Metric Tons)', value: 'QTY'}]
      })
    ).toEqual(
      {
        isFetching: false,
        partnerCountries: [{label: 'Exports', value: 'EXP'}, {label: 'Imports', value: 'IMP'}],
        productGroups: [{label: 'Value (US Dollars)', value: 'VALUE'}, {label: 'Quantity (Metric Tons)', value: 'QTY'}]
      }
    )
  })

})