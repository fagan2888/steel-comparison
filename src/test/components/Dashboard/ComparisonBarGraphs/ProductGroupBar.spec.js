import React from 'react'
import { mount } from 'enzyme'
import ProductGroupBar from '../../../../components/Dashboard/ComparisonBarGraphs/ProductGroupBar'
import test_data from '../test_data'

function setup() {
  const props = test_data
  props.time_periods = ['2015', '2016', 'ytd_2016', 'ytd_2017']
  const wrapper = mount(<ProductGroupBar {...props} />)

  jest.mock('react-chartjs-2', () => ({
    HorizontalBar: () => null,
  }))

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('ProductGroupBar', () => {
    it('should render the graph title', () => {
      const { wrapper } = setup()
  
      const heading = wrapper.find('h3')
      expect(heading.hasClass('chart_title')).toBe(true)
      expect(heading.text()).toBe('United States Imports from Top 5 Trading Countries of All Steel Mill Products in Thousands of Metric Tons')
    })

    it('should render the graph with the correct data and labels', () => {
      const { wrapper } = setup()
      
      expect(wrapper.find('HorizontalBarGraph').props().data_entries).toEqual(
          [ { id: '40f18fa4c89bbefdf38e55e183da2acc20e334f3',
           reporter_country: 'United States',
           partner_country: 'Mexico',
           product_group: 'All Steel Mill Products',
           flow_type: 'QTY',
           sum_2010: 2554401.61,
           sum_2011: 2625729.322,
           sum_2012: 2443513.509,
           sum_2013: 2896186.895,
           sum_2014: 3365430.911,
           sum_2015: 2481159.223,
           sum_2016: 2730494.507,
           ytd_2016: 1245010.933,
           ytd_2017: 1582769.391,
           percent_change_ytd: 27.12895518,
           ytd_end_month: 'Jun',
           trade_flow: 'IMP' },
         { id: '11a63d12e897ce6082318c78a15c6ff0dd61aab3',
           reporter_country: 'United States',
           partner_country: 'Egypt',
           product_group: 'All Steel Mill Products',
           flow_type: 'QTY',
           sum_2010: 0,
           sum_2011: 0,
           sum_2012: 414.507,
           sum_2013: 0,
           sum_2014: 25901.74,
           sum_2015: 19.06,
           sum_2016: 10014.259,
           ytd_2016: 139.855,
           ytd_2017: 65923.313,
           percent_change_ytd: 47036.9010761,
           ytd_end_month: 'Jun',
           trade_flow: 'IMP' },
         { id: '02411736e48194b88efee30157032bea898bb1c5',
           reporter_country: 'United States',
           partner_country: 'Finland',
           product_group: 'All Steel Mill Products',
           flow_type: 'QTY',
           sum_2010: 86001.539,
           sum_2011: 30733.14,
           sum_2012: 51052.597,
           sum_2013: 71710.416,
           sum_2014: 114509.999,
           sum_2015: 34347.314,
           sum_2016: 47960.39,
           ytd_2016: 18090.754,
           ytd_2017: 25447.805,
           percent_change_ytd: 40.6674647171,
           ytd_end_month: 'Jun',
           trade_flow: 'IMP' },
         { id: '5b0f7c69ca148f7d43dcb543dff0232381de9d06',
           reporter_country: 'United States',
           partner_country: 'Colombia',
           product_group: 'All Steel Mill Products',
           flow_type: 'QTY',
           sum_2010: 46089.381,
           sum_2011: 58182.693,
           sum_2012: 55454.37,
           sum_2013: 15297.186,
           sum_2014: 20173.718,
           sum_2015: 14982.377,
           sum_2016: 17358.388,
           ytd_2016: 7893.024,
           ytd_2017: 17291.64,
           percent_change_ytd: 119.074970506,
           ytd_end_month: 'Jun',
           trade_flow: 'IMP' },
         { id: '75f29dd9d315c0601cd1e09c8b411a09b43ebdc8',
           reporter_country: 'United States',
           partner_country: 'Guatemala',
           product_group: 'All Steel Mill Products',
           flow_type: 'QTY',
           sum_2010: 2044.349,
           sum_2011: 2610.688,
           sum_2012: 4053.093,
           sum_2013: 4825.729,
           sum_2014: 2964.726,
           sum_2015: 4007.503,
           sum_2016: 14401.248,
           ytd_2016: 3838.477,
           ytd_2017: 14267.045,
           percent_change_ytd: 271.685045918,
           ytd_end_month: 'Jun',
           trade_flow: 'IMP' } ]
        )
      expect(wrapper.find('HorizontalBarGraph').props().labels).toEqual(
        [ 'Mexico', 'Egypt', 'Finland', 'Colombia', 'Guatemala' ]
      )
    })

    it('should render the footnote', () => {
      const { wrapper } = setup()

      const footnote = wrapper.find('p')
      expect(footnote.hasClass('graph_footnote')).toBe(true)
      expect(footnote.text()).toBe("Source: Annual data from UN Comtrade, Desa/UNSD; YTD data from HIS Global Trade Atlas sourced from the reporting country's official statistics.  Partner countries are sorted by most recent time period.")
    })
  })
})