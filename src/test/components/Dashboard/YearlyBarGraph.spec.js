import React from 'react'
import { mount } from 'enzyme'
import YearlyBarGraph from '../../../components/Dashboard/YearlyBarGraph'
import test_data from './test_data'

function setup() {
  const props = test_data
  const wrapper = mount(<YearlyBarGraph {...props} />)

  jest.mock('react-chartjs-2', () => ({
    Bar: () => null,
  }))

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('YearlyBarGraph', () => {
    it('should render the graph title', () => {
      const { wrapper } = setup()
  
      const heading = wrapper.find('h3')
      expect(heading.hasClass('chart_title')).toBe(true)
      expect(heading.text()).toBe('United States Imports from World of All Steel Mill Products in Thousands of Metric Tons')
    })

    it('should render the graph with the correct data and labels', () => {
      const { wrapper } = setup()

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
                label: "",
                fill: false,
                backgroundColor: [
                    "#5ab4ac",
                    "#5ab4ac",
                    "#5ab4ac",
                    "#5ab4ac",
                    "#5ab4ac",
                    "#5ab4ac",
                    "#5ab4ac",
                    "#d8b365",
                    "#d8b365"
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
        )
    })

    it('should render the footnote', () => {
      const { wrapper } = setup()

      const footnote = wrapper.find('p')
      expect(footnote.hasClass('graph_footnote')).toBe(true)
      expect(footnote.text()).toBe("Source: Annual data from UN Comtrade, Desa/UNSD; YTD data from HIS Global Trade Atlas sourced from the reporting country's official statistics.  Updated on 09-14-2017.")
    })
  })
})