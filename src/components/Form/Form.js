import React from 'react';
import PropTypes from 'prop-types';
import { Field, formValues, reduxForm, formValueSelector, change } from 'redux-form';
import Select from 'react-select';
import moment from 'moment';
import { connect } from 'react-redux';
import DownloadButton from '../Dashboard/DownloadButton';
import DynamicLink from '../Dashboard/DynamicLink';

import { requestTradeFlowSubgroups, requestReporterSubgroups } from '../../actions/form_options';
import './Form.scss';
import { isEmpty, map, snakeCase } from '../../utils/lodash';

const required = value => (value ? undefined : 'This value is required.');

const SelectField = ({ input, name, options, meta, handleChange = null }) => {
  return (
  <div>
    <div>
      <Select
        {...input}
        inputProps={{'id': name}}
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

  constructor(props) {
    super(props);
    this.handleTradeFlowChange = this.handleTradeFlowChange.bind(this);
    this.handleReporterCountryChange = this.handleReporterCountryChange.bind(this);
  }

  componentDidUpdate(){
    const { dispatch, formOptions, formValues } = this.props;
    const reporter_countries = map(formOptions.reporterCountries, obj => { return obj.value});
    const partner_countries = map(formOptions.partnerCountries, obj => { return obj.value});
    const product_groups = map(formOptions.productGroups, obj => { return obj.value});
    
    if (!isEmpty(reporter_countries) && !reporter_countries.includes(formValues.reporter_country))
      dispatch(change('dashboard', 'reporterCountries', null));
    if (!isEmpty(partner_countries) && !partner_countries.includes(formValues.partner_country))
      dispatch(change('dashboard', 'partnerCountries', null));
    if (!isEmpty(product_groups) && !product_groups.includes(formValues.product_group))
      dispatch(change('dashboard', 'productGroups', null));
  }

  handleTradeFlowChange(e) {
    return this.props.dispatch(requestTradeFlowSubgroups(e, this.props.formValues.reporter_country));
  }

  handleReporterCountryChange(e) {
    return this.props.dispatch(requestReporterSubgroups(this.props.formValues.trade_flow, e));
  }

  render() {
    const { handleSubmit, formOptions, results } = this.props;
    return (
      <form className="explorer__form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Steel Search Form</legend>

          <div className="explorer__form__row">
            <div className="explorer__form__label_group">
              <label htmlFor="tradeFlow">Trade Flow</label>
              <p>
                Direction of trade: exports or imports.
              </p>
            </div>

            <div className="explorer__form__select_group">
              <Field name="tradeFlow" validate={required} component={ props =>
                <SelectField 
                  input={props.input}
                  name="tradeFlow" 
                  options={formOptions.tradeFlows} 
                  meta={props.meta}
                  handleChange={this.handleTradeFlowChange} 
                />
              }/>
            </div>
          </div>

          <div className="explorer__form__row">
            <div className="explorer__form__label_group">
              <label htmlFor="reporterCountries">Reporting Country</label>
              <p>
                A country reporting steel trade from either its exporting or importing perspective.
              </p>
            </div>

            <div className="explorer__form__select_group">
              <Field name="reporterCountries" validate={required} component={ props =>
                <SelectField 
                  input={props.input}
                  name="reporterCountries" 
                  options={formOptions.reporterCountries} 
                  meta={props.meta}
                  handleChange={this.handleReporterCountryChange} 
                />
              }/>
            </div>
          </div>

          <div className="explorer__form__row">
            <div className="explorer__form__label_group">
              <label htmlFor="partnerCountries">Partner Country</label>
              <p>
                Destination of a reporting country’s steel exports or imports.
              </p>
            </div>

            <div className="explorer__form__select_group">
              <Field name="partnerCountries" validate={required} component={ props =>
                <SelectField 
                  input={props.input}
                  name="partnerCountries" 
                  options={formOptions.partnerCountries} 
                  meta={props.meta}
                />
              }/>
            </div>
          </div>

          <div className="explorer__form__row">
            <div className="explorer__form__label_group">
              <label htmlFor="productGroups">Product Groups</label>
              <p>
                Steel Mill Products are contained in Flat, Long, Pipe/Tube, Semi-Finished or Stainless products. <a href="https://www.trade.gov/steel/pdfs/product-definitions.pdf" target="_blank">More Information.</a>
              </p>
            </div>

            <div className="explorer__form__select_group">
              <Field name="productGroups" validate={required} component={ props =>
                <SelectField 
                  input={props.input}
                  name="productGroups"
                  options={formOptions.productGroups} 
                  meta={props.meta}
                />
              }/>
            </div>
          </div>

          <div className="explorer__form__row">
            <div className="explorer__form__label_group">
              <label htmlFor="flowType">Quantity or Value</label>
              <p>
                Unit of measure - either metric tons or U.S. dollars.
              </p>
            </div>

            <div className="explorer__form__select_group">
              <Field name="flowType" validate={required} component={ props =>
                <SelectField 
                  input={props.input}
                  name="flowType" 
                  options={formOptions.flowTypes} 
                  meta={props.meta} 
                />
              }/>
            </div>
          </div>

          <div className="explorer__form__row">
              <button className="explorer__button explorer__form__submit pure-button pure-button-primary" onClick={handleSubmit}>
                Generate Dashboard
              </button>
          </div>

          <div className="explorer__form__row">
            <DynamicLink query={results.query} />
          </div>
        </fieldset>
      </form>
    );
  }
}

DashboardForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  formOptions: PropTypes.object.isRequired,
  formValues: PropTypes.object.isRequired
}

export { DashboardForm };

const ConnectedForm = reduxForm({
  form: 'dashboard',
  enableReinitialize: true
})(DashboardForm);

const selector = formValueSelector('dashboard');

const mapStateToProps = (state) => {
  const formOptions = state.form_options;
  const formValues = {};
  formValues['trade_flow'] = selector(state, 'tradeFlow');
  formValues['reporter_country'] = selector(state, 'reporterCountries');
  formValues['partner_country'] = selector(state, 'partnerCountries');
  formValues['product_group'] = selector(state, 'productGroups');
  return {
    formValues,
    formOptions
  }
}

export default connect(
  mapStateToProps
)(ConnectedForm);
