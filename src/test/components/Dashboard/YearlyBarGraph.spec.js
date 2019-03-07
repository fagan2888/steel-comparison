import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import YearlyBarGraph from '../../../components/Dashboard/YearlyBarGraph';
import test_data from './test_data';

jest.mock('react-chartjs-2', () => ({
  Bar: () => null
}));

configure ({ adapter: new Adapter() });

function setup() {
  const wrapper = mount(<YearlyBarGraph data={test_data.dashboardData} query={test_data.query} />);

  return {
    wrapper
  };
}

describe('components', () => {
  describe('YearlyBarGraph', () => {
    it('should render the graph title', () => {
      const { wrapper } = setup();

      const heading = wrapper.find('h3');
      expect(heading.hasClass('explorer__chart-title')).toBe(true);
      expect(heading.text()).toBe('United States Imports from World of All Steel Mill Products in Thousands of Metric Tons - View Data');
    });

    it('should render the graph with the correct data and labels', () => {
      const { wrapper } = setup();

      expect(wrapper.find('Bar').props().data).toEqual( 
         { labels: 
            [ '2010',
              '2011',
              '2012',
              '2013',
              '2014',
              '2015',
              '2016',
              'YTD Jun 2016',
              'YTD Jun 2017' ],
            datasets: [
              {
                label: '',
                fill: false,
                backgroundColor: [
                  '#5ab4ac',
                  '#5ab4ac',
                  '#5ab4ac',
                  '#5ab4ac',
                  '#5ab4ac',
                  '#5ab4ac',
                  '#5ab4ac',
                  '#d8b365',
                  '#d8b365'
                ],
                data: [
                  21768.809258999998,
                  26028.847515999998,
                  30458.246084,
                  29246.437534,
                  40286.099005000004,
                  35375.273193,
                  30065.048132,
                  14191.373622,
                  17852.770024999998
                ]
              }
            ]
          }
        );
    });

    it('should render the footnote', () => {
      const { wrapper } = setup();

      const footnote = wrapper.find('p');
      expect(footnote.hasClass('explorer__graph-footnote')).toBe(true);
      expect(footnote.text()).toBe('Source: U.S. Department of Commerce, Enforcement and Compliance.  Includes content supplied by IHS Global Ltd.; Copyright © IHS Global, Ltd., 2018. All rights reserved.  Updated on 09-14-2017.');
    });
  });
});