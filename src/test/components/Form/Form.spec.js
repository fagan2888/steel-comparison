import React from 'react'
import { shallow } from 'enzyme'
import { DashboardForm } from '../../../components/Form/Form'
import test_data from './test_data'
import sinon from 'sinon'

describe('DashboardForm', () => {
  const handleSubmit = sinon.spy()
  const dispatch = sinon.spy()

  function setup() {
    const props = test_data
    const form_values = {}
    const wrapper = shallow(<DashboardForm {...props} formValues={form_values} handleSubmit={handleSubmit} dispatch={dispatch} />)

    return {
      props,
      wrapper
    }
  }

  it('should render the form with select dropdowns in the correct order', () => {
    const { wrapper } = setup()
    let field_array = wrapper.find('Field')

    expect(field_array.length).toEqual(5);
    expect(field_array.nodes[0].props.name).toEqual('tradeFlow');
    expect(field_array.nodes[1].props.name).toEqual('productGroups');
    expect(field_array.nodes[2].props.name).toEqual('reporterCountries');
    expect(field_array.nodes[3].props.name).toEqual('flowType');
    expect(field_array.nodes[4].props.name).toEqual('partnerCountries');
  })

  it('should handle a Trade Flow change as expected', () => {
    const { wrapper } = setup()
    const form = wrapper.find('form')
    //form.handleTradeFlowChange('val')
    //expect(dispatch.callCount).toEqual(4)
  })

  it('should handle a Reporting Country change as expected', () => {

  })

  it('should handle a Submit as expected', () => {
    const { wrapper } = setup()
    const form = wrapper.find('form')
    form.simulate('submit')
    expect(handleSubmit.callCount).toEqual(1)
  })

})