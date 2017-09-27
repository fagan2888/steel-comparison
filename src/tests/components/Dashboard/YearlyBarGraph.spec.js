import React from 'react'
import { mount } from 'enzyme'
import YearlyBarGraph from '../../../components/Dashboard/YearlyBarGraph'
import test_data from './test_data'

function setup() {
  const props = test_data

  const enzymeWrapper = mount(<YearlyBarGraph {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('YearlyBarGraph', () => {
    it('should render the graph title', () => {
      const { enzymeWrapper } = setup()

      const heading = enzymeWrapper.find('h3')
      expect(heading.hasClass('chart_title')).toBe(true)
      expect(heading.text()).toBe('United States Imports from World of All Steel Mill Products in Thousands of Metric Tons')
    })

    it('should render the graph', () => {

    })

    it('should render the footnote', () => {
      const { enzymeWrapper } = setup()

      const footnote = enzymeWrapper.find('p')
      expect(footnote.hasClass('graph_footnote')).toBe(true)
      expect(footnote.text()).toBe("Source: Annual data from UN Comtrade, Desa/UNSD; YTD data from HIS Global Trade Atlas sourced from the reporting country's official statistics.  Updated on 09-14-2017.")
    })
  })
})