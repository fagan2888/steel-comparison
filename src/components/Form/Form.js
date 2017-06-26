import React, { Component, PropTypes } from 'react';
import { reduxForm, change } from 'redux-form';
import Select from 'react-select';
import moment from 'moment';
import FormMessages from 'redux-form-validation';
import { generateValidation } from 'redux-form-validation';
import './Form.scss';

 const validations = {
     reporterCountries: {
       required: true
     },
     flowType: {
      required: true
     },
     partnerCountries: {
       required: false
     },
     productGroups: {
       required: false
     },
   };

const SelectField = ({ description, field, label = 'Untitled', options, multi = false }) => (
  <div className="explorer__form__group">
    <label htmlFor={field.name}>{label}</label>
    {description ? <p>{description}</p> : null}
    <div>
      <Select
        {...field}
        options={options}
        multi={multi} autoBlur
        onBlur={() => field.onBlur(field.value)}
        joinValues = {true}
        delimiter = {','}
        simpleValue = {true}
      />
    </div>
  </div>
);
SelectField.propTypes = {
  description: PropTypes.string,
  field: PropTypes.object.isRequired,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  multi: PropTypes.bool,
};

class Form extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    formOptions: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { 
      fields: {  reporterCountries, partnerCountries, productGroups, flowType }, 
      handleSubmit,
      formOptions 
    } = this.props;

    return (
      <form className="explorer__form" onSubmit={handleSubmit}>
        <fieldset>

          <SelectField field={reporterCountries} options={formOptions.reporterCountries} label="Reporter Countries" description="" multi/>
          <FormMessages field={reporterCountries} >
               <p className="validation-error" when="required">
                 Must enter at least one reporter country.
               </p>
          </FormMessages>

          <SelectField field={flowType} options={formOptions.flowTypes} label="Quantity (metric tons) or Value (US dollars)" description="" multi/>
          <FormMessages field={flowType} >
             <p className="validation-error" when="required">
               Must choose to report by quantity or dollar value.  
             </p>
          </FormMessages>

          <div className="explorer__form__row">
            <p>Choose one or more partner countries OR one or more product groups to aggregate by: </p>
            <SelectField field={partnerCountries} options={formOptions.partnerCountries} label="Partner Countries" description="" multi/>
            <SelectField field={productGroups} options={formOptions.productGroups} label="Product Groups" description="" multi/>
          </div>

          <div className="explorer__form__group">
            <button className="explorer__form__submit pure-button pure-button-primary" onClick={handleSubmit}>
              <i className="fa fa-paper-plane" /> Generate Reports
            </button>
          </div>
        </fieldset>
      </form>
    );
  }
}

export default reduxForm({
  form: 'form',
  fields: ['reporterCountries', 'partnerCountries', 'productGroups', 'flowType'],
  ...generateValidation(validations)
})(Form);
