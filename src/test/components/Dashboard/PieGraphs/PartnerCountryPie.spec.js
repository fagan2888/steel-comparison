import React from 'react';
import { mount } from 'enzyme';
import PartnerCountryPie from '../../../../components/Dashboard/PieGraphs/PartnerCountryPie';
import test_data from '../test_data';

jest.mock('react-chartjs-2', () => ({
  Pie: () => null
}));

function setup() {
  const props = {};
  props.query = test_data.query;
  props.data = test_data.dashboardData.partner_country_entry;
  props.last_updated = test_data.dashboardData.source_last_updated;
  props.time_period = 'ytd_2017';

  const wrapper = mount(<PartnerCountryPie {...props} />);

  return {
    props,
    wrapper
  };
}

describe('components', () => {
  describe('PartnerCountryPie', () => {
    it('should render the graph title', () => {
      const { wrapper } = setup();
  
      const heading = wrapper.find('h3');
      expect(heading.hasClass('explorer__chart-title')).toBe(true);
      expect(heading.text()).toBe('Share of United States Imports from World by Product in Metric Tons - YTD Jun 2017');
    });

    it('should render the graph with the correct data and labels', () => {
      const { wrapper } = setup();
      
      expect(wrapper.find('PieGraph').props().data_values).toEqual(
          ['34.30', '22.92', '20.57', '19.53', '2.67']
        );
      expect(wrapper.find('PieGraph').props().labels).toEqual(
        ['Flat Products', 'Semi-Finished Products', 'Long Products', 'Pipe and Tube Products', 'Stainless Products']
      );
    });

    it('should render the footnote', () => {
      const { wrapper } = setup();

      const footnote = wrapper.find('p');
      expect(footnote.hasClass('explorer__graph-footnote')).toBe(true);
      expect(footnote.text()).toBe('Source: U.S. Department of Commerce, Enforcement and Compliance using data from IHS Markit - Global Trade Atlas sourced from the reporting country\'s official statistics.  Updated on 09-14-2017.  Trade covered in the table is 17,852,770.02 metric tons.');
    });
  });
});