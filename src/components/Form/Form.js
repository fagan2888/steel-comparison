import React from 'react';
import PropTypes from 'prop-types';
import { Field, formValues, reduxForm, formValueSelector, change } from 'redux-form';
import Select from 'react-select';
import moment from 'moment';
import { connect } from 'react-redux';

import { requestTradeFlowSubgroups, requestReporterSubgroups } from '../../actions/form_options';
import './Form.scss';
import { isEmpty, map, snakeCase } from '../../utils/lodash';

const required = value => (value ? undefined : 'This value is required.');

const SelectField = ({ input, name, label = 'Untitled', options, meta, handleChange = null }) => {
  return (
  <div>
    <label htmlFor={name}>{label}</label>
    <div>
      <Select
        {...input}
        name={name}
        options={options}
        value={input.value}
        multi={false}
        onBlur={(option) => input.onBlur(option.value)}
        simpleValue = {true}
        onChange={value => {
          input.onChange(value)
          if (handleChange){
            handleChange(value);
          }
        }}
      />
    </div>
    <div className="validation-error">
      {meta.error &&
          <span>
            {meta.error}
          </span>}
    </div>
  </div>
);
}
SelectField.propTypes = {
  input: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  meta: PropTypes.object,
  handleChange: PropTypes.func
};

class DashboardForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    formOptions: PropTypes.object.isRequired,
    formValues: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.handleTradeFlowChange = this.handleTradeFlowChange.bind(this);
    this.handleReporterCountryChange = this.handleReporterCountryChange.bind(this);
  }

  handleTradeFlowChange(e) {
    this.props.dispatch(change('dashboard', 'reporterCountries', null));
    this.props.dispatch(change('dashboard', 'partnerCountries', null));
    this.props.dispatch(change('dashboard', 'productGroups', null));

    return this.props.dispatch(requestTradeFlowSubgroups(e));
  }

  handleReporterCountryChange(e) {
    this.props.dispatch(change('dashboard', 'partnerCountries', null));
    this.props.dispatch(change('dashboard', 'productGroups', null));

    return this.props.dispatch(requestReporterSubgroups(this.props.formValues.trade_flow, e));
  }

  render() {
    const { handleSubmit, formOptions } = this.props;

    return (
      <form className="explorer__form" onSubmit={handleSubmit}>
        <fieldset>

          <div className="explorer__form__row">
            <div className="explorer__form__group">
              <Field name="tradeFlow" validate={required} component={ props =>
                <SelectField 
                  input={props.input}
                  name="tradeFlow" 
                  options={formOptions.tradeFlows} 
                  label="Trade Flow" 
                  meta={props.meta}
                  handleChange={this.handleTradeFlowChange} 
                />
              }/>
            </div>

            <div className="explorer__form__group">
              <Field name="productGroups" validate={required} component={ props =>
                <SelectField 
                  input={props.input}
                  name="productGroups"
                  options={formOptions.productGroups} 
                  label="Product Groups" 
                  meta={props.meta}
                />
              }/>
            </div>
          </div>

          <div className="explorer__form__row">
            <div className="explorer__form__group">
              <Field name="reporterCountries" validate={required} component={ props =>
                <SelectField 
                  input={props.input}
                  name="reporterCountries" 
                  options={formOptions.reporterCountries} 
                  label="Reporting Country" 
                  meta={props.meta}
                  handleChange={this.handleReporterCountryChange} 
                />
              }/>
            </div>

            <div className="explorer__form__group">
              <Field name="flowType" validate={required} component={ props =>
                <SelectField 
                  input={props.input}
                  name="flowType" 
                  options={formOptions.flowTypes} 
                  label="Quantity or Value"
                  meta={props.meta} 
                />
              }/>
            </div>
          </div>

          <div className="explorer__form__row">
            <div className="explorer__form__group">
              <Field name="partnerCountries" validate={required} component={ props =>
                <SelectField 
                  input={props.input}
                  name="partnerCountries" 
                  options={formOptions.partnerCountries} 
                  label="Partner Country" 
                  meta={props.meta}
                />
              }/>
            </div>
            <div className="explorer__form__group">
              <button className="explorer__button explorer__form__submit pure-button pure-button-primary" onClick={handleSubmit}>
                Generate Dashboard
              </button>
            </div>
          </div>

        </fieldset>
      </form>
    );
  }
}

export { DashboardForm };

const ConnectedForm = reduxForm({
  form: 'dashboard'
})(DashboardForm);

const selector = formValueSelector('dashboard')

export default connect(state => {
  const formValues = {};
  formValues['trade_flow'] = selector(state, 'tradeFlow');
  return {
    formValues
  }
})(ConnectedForm);
