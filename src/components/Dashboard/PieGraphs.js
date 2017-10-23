import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import ProductGroupPie from './PieGraphs/ProductGroupPie';
import PartnerCountryPie from './PieGraphs/PartnerCountryPie';
import DateSelect from './DateSelect';

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
      <div className="third-row pure-u-1 pure-g">
        <div className="pure-u-1 pure-u-xl-1-2 explorer__primary-graph">
          <div className="explorer__form-content">
            <form className="explorer__form">
              <fieldset>
                <DateSelect name="piePeriod" form_options={this.props.form_options} onChange={this.handleChange} default_val={this.state.time_period} label="Pie Graphs Time Interval" />
              </fieldset>
            </form>
          </div>

          <ProductGroupPie data={this.props.result.product_group_entry} params={this.props.query} last_updated={this.props.result.source_last_updated} time_period={this.state.time_period} />
        </div>
        
        <div className="pure-u-1 pure-u-xl-1-2 explorer__pie-graph explorer__second-graph">
          <PartnerCountryPie data={this.props.result.partner_country_entry} params={this.props.query} last_updated={this.props.result.source_last_updated} time_period={this.state.time_period} />
        </div>
      </div>
    );
  }
}

export default PieGraphs;