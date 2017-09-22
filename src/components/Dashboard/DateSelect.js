import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const SelectField = ({ description, name, label = 'Untitled', options, onChange, default_val }) => (
  <div>
    <label htmlFor={name}>{label}</label>
    {description ? <p>{description}</p> : null}
    <div>
      <Select
        name={name}
        value={default_val}
        options={options}
        multi={false} autoBlur
        simpleValue = {true}
        onChange={onChange}
      />
    </div>
  </div>
);
SelectField.propTypes = {
  description: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  multi: PropTypes.bool,
};

const DateSelect = ({name, form_options, onChange, default_val, label}) => {
  return (
    <div className="explorer__form__group">
      <SelectField name={name} options={form_options} label={label} description="" onChange={onChange} default_val={default_val} />
    </div>
  );
}

export default DateSelect;