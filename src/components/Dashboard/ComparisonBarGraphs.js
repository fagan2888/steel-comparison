import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import ProductGroupBar from './ComparisonBarGraphs/ProductGroupBar';
import PartnerCountryBar from './ComparisonBarGraphs/PartnerCountryBar';
import { compact, indexOf, map, xor } from '../../utils/lodash';
import DateSelect from './DateSelect';

class ComparisonBarGraphs extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      first_interval: this.props.form_options[this.props.form_options.length - 2].value,
      second_interval: this.props.form_options[this.props.form_options.length - 1].value
    };
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
    const old_keys = Object.keys(this.props.data.product_group_entry[0]).sort();
    const keys = xor(old_keys, excluded_fields);

    const first_index = indexOf(keys, this.state.first_interval);
    const second_index = indexOf(keys, this.state.second_interval);
    let date_range = [];
    if (first_index < second_index)
      date_range = keys.slice(first_index, second_index+1);
    else
      date_range = keys.slice(second_index, first_index+1);

    return (
      <div className="explorer__second-row pure-u-1 pure-g">
        <div className="pure-u-1 pure-u-xl-1-2 explorer__primary-graph">
          <div className="explorer__form-content">
            <form className="explorer__form">
              <fieldset>
                <legend>Comparison Bar Graphs Form</legend>
                <p>Select the date range for the two charts below: </p>
                <DateSelect name="compPeriod1" form_options={this.props.form_options} onChange={this.handleStartChange} default_val={this.state.first_interval} label="Start Date" />
                <DateSelect name="compPeriod2" form_options={this.props.form_options} onChange={this.handleEndChange} default_val={this.state.second_interval} label="End Date" />
              </fieldset>
            </form>
          </div>
        
          <ProductGroupBar data={this.props.data} query={this.props.query} time_periods={date_range} />
        </div>

        <div className="pure-u-1 pure-u-xl-1-2 explorer__second-graph-bar">
          <PartnerCountryBar data={this.props.data} query={this.props.query}  time_periods={date_range} />
        </div>
      </div>
    );
  }
}

export default ComparisonBarGraphs;