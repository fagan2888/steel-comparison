import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Form from './Form';
import config from '../config';
import ContactTOS from './ContactTOS';

class FormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comparisonType: "Trade Flows",
    }
    this.handleChangeComparisonType = this.handleChangeComparisonType.bind(this);
  }

  handleChangeComparisonType(event) {
    this.setState({ comparisonType: event.target.value });
  }

  render() {
    function scrollFunction() {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        document.getElementById("BackToTop").style.display = "block";
      } else {
        document.getElementById("BackToTop").style.display = "none";
      }
    }

    function topFunction() {
      window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
      });      
    }
  
    window.onscroll = function() {scrollFunction()};

    return (
      <div>
        <a id="GSTM_banner" href={config.GSTM_link} target="_blank" rel="noopener noreferrer">View the Interactive Global Steel Trade Monitor</a>
        <h1><a href={config.monitor_link} target="_blank" rel="noopener noreferrer">Comparison Dashboard</a></h1>
        <p className="DefaultParagraph-1">
        The Global Steel Trade Monitor Comparison Dashboard (GSTM Comparison Dashboard) is a tool that features a series of interactive data tables and graphs that allow comparisons of  global steel trade data. This also provides stakeholders with further trend analysis on the global steel trade. The GTSM Comparison Dashboard enables users to search for and compare steel trade trends by multiple Reporting Countries, Partner Countries, Product Groups, or Trade Flows.
        </p>
        <p>
          Please select the way that you would like to compare the information, and then {config.instructions[this.state.comparisonType]}
        </p>
        <p>
          Please cite the data and graphs as: U.S. Department of Commerce, Enforcement and Compliance using data from IHS Markit - Global Trade Atlas sourced from the reporting country's official statistics.
        </p>
        <div className="center-fieldset">
          <fieldset onChange={this.handleChangeComparisonType} id="comparisonType">
            <legend>Select the type of comparison:</legend>
            <div className="comparison-option">
              <input type="radio" name="comparisonType" value="Trade Flows" id="two-trade-flows" defaultChecked />
              <label htmlFor="two-trade-flows">Two Trade Flows</label>
            </div>
            <div className="comparison-option">
              <input type="radio" name="comparisonType" value="Reporting Countries" id="two-reporting-countries" />
              <label htmlFor="two-reporting-countries">Two Reporting Countries</label>
            </div>
            <div className="comparison-option">
              <input type="radio" name="comparisonType" value="Partner Countries" id="two-partner-countries" />
              <label htmlFor="two-partner-countries">Two Partner Countries</label>
            </div>
            <div className="comparison-option">
              <input type="radio" name="comparisonType" value="Product Groups" id="two-product-groups" />
              <label htmlFor="two-product-groups">Two Product Groups</label>
            </div>
          </fieldset>
        </div>

        <Form
          comparisonType={this.state.comparisonType}
          tradeRepository = {this.props.tradeRepository}
        />

        <ContactTOS/>

        <button onClick={topFunction} id="BackToTop">Back to Top</button>
      </div>
    );
  }
}

export default withRouter(FormContainer);