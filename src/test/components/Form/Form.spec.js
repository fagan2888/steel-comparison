import React from 'react';
import { mount } from 'enzyme';
import ConnectedForm from '../../../components/Form/Form';
import test_data from './test_data';
import sinon from 'sinon';

import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Select from 'react-select';

describe('ConnectedForm', () => {
  let dispatch = sinon.spy();
  let handleSubmit = sinon.spy();

  function setup() {
    const props = test_data;
    const form_values = {};
    const store = createStore(combineReducers({ form: formReducer }));
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedForm {...props} handleSubmit={handleSubmit} dispatch={dispatch} />
      </Provider>
    );

    return {
      props,
      wrapper
    };
  }

  it('should render the select dropdowns in the correct order', () => {
    const { wrapper } = setup();
    const field_array = wrapper.find('Select');

    expect(field_array.length).toEqual(5);
    expect(field_array.nodes[0].props.name).toEqual('tradeFlow');
    expect(field_array.nodes[1].props.name).toEqual('reporterCountries');
    expect(field_array.nodes[2].props.name).toEqual('partnerCountries');
    expect(field_array.nodes[3].props.name).toEqual('productGroups');
    expect(field_array.nodes[4].props.name).toEqual('flowType');
  });

  it('should render the select dropdowns with the correct initial values', () => {
    const { wrapper } = setup();
    const field_array = wrapper.find('Select');

    expect(field_array.length).toEqual(5);
    expect(field_array.nodes[0].props.value).toEqual('IMP');
    expect(field_array.nodes[1].props.value).toEqual('United States');
    expect(field_array.nodes[2].props.value).toEqual('World');
    expect(field_array.nodes[3].props.value).toEqual('All Steel Mill Products');
    expect(field_array.nodes[4].props.value).toEqual('QTY');
  });

  it('should handle a Trade Flow change as expected', () => {
    const { wrapper } = setup();
    // Not sure how to test this
  });

  it('should handle a Reporting Country change as expected', () => {
    // Not sure how to test this
  });

  it('should handle a Submit as expected', () => {
    const { wrapper } = setup();
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(handleSubmit.callCount).toEqual(1);
  });
});