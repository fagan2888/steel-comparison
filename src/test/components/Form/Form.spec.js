import React from 'react'
import { shallow } from 'enzyme'
import { DashboardForm } from '../../../components/Form/Form'
import test_data from './test_data'

function handleSubmit(){
  return true;
}

function setup() {
  const props = test_data
  const form_values = {}
  const wrapper = shallow(<DashboardForm {...props} formValues={form_values} handleSubmit={handleSubmit}/>)

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('DashboardForm', () => {
    it('should render the form', () => {
      const { wrapper } = setup()
      console.log(wrapper.debug())
      console.log(wrapper.find('Field'))
      expect(wrapper.find('Field').length).toEqual(5);
      
    })
  })
})