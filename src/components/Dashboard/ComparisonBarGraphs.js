import React, { PropTypes } from 'react';
import Select from 'react-select';
import ProductGroupBarGraph from './ProductGroupBarGraph';
import PartnerCountryBarGraph from './PartnerCountryBarGraph';
import moment from 'moment';
import { xor, indexOf } from '../../utils/lodash';

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
    this.setState({first_interval: e});
  }

  handleEndChange(e) {
    this.setState({second_interval: e});
  }

  render() {
    const excluded_fields = ['id', 'reporter_country', 'partner_country', 'product_group', 'flow_type', 'percent_change_ytd', 'ytd_end_month', 'trade_flow'];
    const old_keys = Object.keys(this.props.result.product_group_entry[0]);
    const keys = xor(old_keys, excluded_fields);
    const first_index = indexOf(keys, this.state.first_interval);
    const second_index = indexOf(keys, this.state.second_interval);
    let date_range = [];
    if (first_index < second_index)
     date_range = keys.slice(first_index, second_index+1);
    else
      date_range = keys.slice(second_index, first_index+1);

    return (
      <div className="pure-u-1 pure-g">
        <div className="pure-u-1 pure-u-xl-1-2 primary_graph">
          <div className="form__content">
            <form className="explorer__form">
              <fieldset>
                <DateSelect form_options={this.props.form_options} onChange={this.handleStartChange} default_val={this.state.first_interval} label="Bar Graphs First Interval" />
                <DateSelect form_options={this.props.form_options} onChange={this.handleEndChange} default_val={this.state.second_interval} label="Bar Graphs Second Interval" />
              </fieldset>
            </form>
          </div>
        
          <ProductGroupBarGraph result={this.props.result} params={this.props.query} time_periods={date_range} />
        </div>

        <div className="pure-u-1 pure-u-xl-1-2 second_graph">
          <PartnerCountryBarGraph result={this.props.result} params={this.props.query}  time_periods={date_range} />
        </div>
      </div>
    );
  }
}

export default ComparisonBarGraphs;