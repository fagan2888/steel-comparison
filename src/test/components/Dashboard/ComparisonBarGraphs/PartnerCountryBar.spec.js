import React from 'react';
import { mount } from 'enzyme';
import PartnerCountryBar from '../../../../components/Dashboard/ComparisonBarGraphs/PartnerCountryBar';
import test_data from '../test_data';

jest.mock('react-chartjs-2', () => ({
  HorizontalBar: () => null
}));

function setup() {
  const time_periods = ['2015', '2016', 'ytd_2016', 'ytd_2017'];
  const wrapper = mount(<PartnerCountryBar data={test_data.dashboardData} query={test_data.query} time_periods={time_periods} />);

  return {
    wrapper
  };
}

describe('components', () => {
  describe('PartnerCountryBar', () => {
    it('should render the graph title', () => {
      const { wrapper } = setup();
  
      const heading = wrapper.find('h3');
      expect(heading.hasClass('explorer__chart-title')).toBe(true);
      expect(heading.text()).toBe('United States Imports from World by Top Steel Products in Thousands of Metric Tons - View Data');
    });

    it('should render the graph with the correct data and labels', () => {
      const { wrapper } = setup();

      expect(wrapper.find('HorizontalBarGraph').props().data_entries).toEqual(
        [ { id: '0e39c9f3979a03fb63e77f1587051d56ae639b85',
           reporter_country: 'United States',
           partner_country: 'World',
           product_group: 'Flat Products',
           flow_type: 'QTY',
           sum_2010: 7118392.104,
           sum_2011: 8246394.354,
           sum_2012: 9570959.829,
           sum_2013: 9323739.933,
           sum_2014: 15113970.345,
           sum_2015: 14308996.302,
           sum_2016: 12216668.735,
           ytd_2016: 5722779.542,
           ytd_2017: 6123077.763,
           percent_change_ytd: 6.99482162579,
           ytd_end_month: 'Jun',
           trade_flow: 'IMP' },
         { id: 'd11e56672b9ae22092c9ac59fb17b0fd725ccbff',
           reporter_country: 'United States',
           partner_country: 'World',
           product_group: 'Semi-Finished Products',
           flow_type: 'QTY',
           sum_2010: 4465690.727,
           sum_2011: 5943952.609,
           sum_2012: 6751528.808,
           sum_2013: 6535193.583,
           sum_2014: 9446777.504,
           sum_2015: 6456720.94,
           sum_2016: 5941492.25,
           ytd_2016: 2556760.115,
           ytd_2017: 4092422.476,
           percent_change_ytd: 60.0628252917,
           ytd_end_month: 'Jun',
           trade_flow: 'IMP' },
         { id: '69bdd46f7b0b2f663a77c01c6597b762b0149c53',
           reporter_country: 'United States',
           partner_country: 'World',
           product_group: 'Long Products',
           flow_type: 'QTY',
           sum_2010: 4360497.97,
           sum_2011: 4616074.608,
           sum_2012: 5282552.517,
           sum_2013: 5598139.577,
           sum_2014: 6830865.196,
           sum_2015: 7264279.857,
           sum_2016: 6937698.23,
           ytd_2016: 3468703.841,
           ytd_2017: 3672688.609,
           percent_change_ytd: 5.88072021569,
           ytd_end_month: 'Jun',
           trade_flow: 'IMP' },
         { id: '2690f8936bcd25b75e7d5682076da936c1d0ea2e',
           reporter_country: 'United States',
           partner_country: 'World',
           product_group: 'Pipe and Tube Products',
           flow_type: 'QTY',
           sum_2010: 4975905.387,
           sum_2011: 6191869.326,
           sum_2012: 7714013.96,
           sum_2013: 6844904.183,
           sum_2014: 7822459.855,
           sum_2015: 6333979.097,
           sum_2016: 4087081.663,
           ytd_2016: 2010641.806,
           ytd_2017: 3487212.906,
           percent_change_ytd: 73.4377995918,
           ytd_end_month: 'Jun',
           trade_flow: 'IMP' },
         { id: '738f957931c5f2a37a11115281668aa4a5962c34',
           reporter_country: 'United States',
           partner_country: 'World',
           product_group: 'Stainless Products',
           flow_type: 'QTY',
           sum_2010: 848323.071,
           sum_2011: 1030556.619,
           sum_2012: 1139190.97,
           sum_2013: 944460.258,
           sum_2014: 1072026.105,
           sum_2015: 1011296.997,
           sum_2016: 882107.254,
           ytd_2016: 432488.318,
           ytd_2017: 477368.271,
           percent_change_ytd: 10.3771480366,
           ytd_end_month: 'Jun',
           trade_flow: 'IMP' } ]
        );
      expect(wrapper.find('HorizontalBarGraph').props().labels).toEqual(
        [ 'Flat Products',
         'Semi-Finished Products',
         'Long Products',
         'Pipe and Tube Products',
         'Stainless Products' ]
      );
    });

    it('should render the footnote', () => {
      const { wrapper } = setup();

      const footnote = wrapper.find('p');
      expect(footnote.hasClass('explorer__graph-footnote')).toBe(true);
      expect(footnote.text()).toBe('Source: U.S. Department of Commerce, Enforcement and Compliance.  Includes content supplied by IHS Global Ltd.; Copyright © IHS Global, Ltd., 2018. All rights reserved.  Updated on 09-14-2017.  Product groups are sorted by most recent time period.');
    });
  });
});