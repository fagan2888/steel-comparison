import React from 'react'
import { mount } from 'enzyme'
import YearlyBarGraph from '../../../components/Dashboard/YearlyBarGraph'

function setup() {
  const props = {
    results:
    params:
  }

  const enzymeWrapper = mount(<YearlyBarGraph {...props} />)

  return {
    props,
    enzymeWrapper
  }
}