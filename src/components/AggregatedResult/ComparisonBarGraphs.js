import React, { PropTypes } from 'react';
import Select from 'react-select';
import ProductGroupBarGraph from './ProductGroupBarGraph';
import PartnerCountryBarGraph from './PartnerCountryBarGraph';

const SelectField = ({ description, label = 'Untitled', options, onChange, default_val }) => (
  <div>
    <label htmlFor='piePeriod'>{label}</label>
    {description ? <p>{description}</p> : null}
    <div>
      <Select
        name='piePeriod'
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

const DateSelect = ({form_options, onChange, default_val, label}) => {
  return (
    <div className="explorer__form__group">
      <SelectField options={form_options} label={label} description="" onChange={onChange} default_val={default_val} />
    </div>
  );
}

class ComparisonBarGraphs extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      first_interval: this.props.form_options[this.props.form_options.length - 2].value,
      second_interval: this.props.form_options[this.props.form_options.length - 1].value
    }
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
  }

  handleStartChange(e) {
    this.setState({first_interval: e})
  }

  handleEndChange(e) {
    this.setState({second_interval: e})
  }

  render() {
    return (
      <div>
        <div>
          <div className="form__content">
            <form className="explorer__form">
              <fieldset>
                <DateSelect form_options={this.props.form_options} onChange={this.handleStartChange} default_val={this.state.first_interval} label="Bar Graphs Start Interval" />
                <DateSelect form_options={this.props.form_options} onChange={this.handleEndChange} default_val={this.state.second_interval} label="Bar Graphs End Interval" />
              </fieldset>
            </form>
          </div>
        
          <ProductGroupBarGraph data={this.props.result.product_group_entry} params={this.props.query} last_updated={this.props.result.source_last_updated} time_periods={this.state} />
        </div>

        <div>
          <PartnerCountryBarGraph data={this.props.result.partner_country_entry} params={this.props.query} last_updated={this.props.result.source_last_updated} time_periods={this.state} />
        </div>
      </div>
    );
  }
}

export default ComparisonBarGraphs;