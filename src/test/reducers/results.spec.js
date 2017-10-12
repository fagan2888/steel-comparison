import { results } from '../../reducers/results'
import * as types from '../../constants'

describe('form options reducer', () => {
  it('should return the initial state', () => {
    expect(results(undefined, {})).toEqual(
      {
        isFetching: false,
        error: "",
        dashboardData: {},
        timePeriods: [],
        query: {}
      }
    )
  })

  it('should handle REQUEST_RESULTS', () => {
    expect(
      results({}, {
        type: types.REQUEST_RESULTS
      })
    ).toEqual(
      {
        error: "",
        isFetching: true
      }
    )
  })

  it('should handle RECEIVE_FAILURE', () => {
    expect(
      results({}, {
        type: types.RECEIVE_FAILURE,
        error: 'Error message.',
      })
    ).toEqual(
      {
        isFetching: false,
        error: 'Error message.'
      }
    )
  })

  it('should handle RECEIVE_RESULTS', () => {
    expect(
      results({}, {
        type: types.RECEIVE_RESULTS,
        results: {
          dashboardData: {entry: 'data'},
          time_periods: ['one', 'two'],
          query: {foo: 'bar'}
        }
      })
    ).toEqual(
      {
        isFetching: false,
        dashboardData: {entry: 'data'},
        timePeriods: ['one', 'two'],
        query: {foo: 'bar'}
      }
    )
  })

})