import React, { PropTypes } from 'react';
import Select from 'react-select';
import ProductGroupPie from './ProductGroupPie';
import PartnerCountryPie from './PartnerCountryPie';

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

const DateSelect = ({form_options, onChange, default_val}) => {
  return (
    <div className="explorer__form__group">
      <SelectField options={form_options} label="Time Period for Pie Graphs" description="" onChange={onChange} default_val={default_val} />
    </div>
  );
}

class PieGraphs extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      time_period: this.props.form_options[this.props.form_options.length - 1].value
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({time_period: e})
  }

  render() {
    return (
      <div>
        <div>
          <div className="form__content">
            <form className="explorer__form">
              <fieldset>
                <DateSelect form_options={this.props.form_options} onChange={this.handleChange} default_val={this.state.time_period} />
              </fieldset>
            </form>
          </div>

          <ProductGroupPie data={this.props.result.product_group_entry} params={this.props.query} last_updated={this.props.result.source_last_updated} time_period={this.state.time_period} />
        </div>
        
        <div>
          <PartnerCountryPie data={this.props.result.partner_country_entry} params={this.props.query} last_updated={this.props.result.source_last_updated} time_period={this.state.time_period} />
        </div>
      </div>
    );
  }
}

export default PieGraphs;