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
        <h1 className="Header-1"><a href={config.monitor_link} target="_blank" rel="noopener noreferrer">GSTM - Comparison Search</a></h1>
        <p className="DefaultParagraph-1">
          The Global Steel Trade Monitor Comparison Dashboard features a series of interactive data tables and graphs that offer insight into the comparative analysis of  global steel trade trends and provide stakeholders with additional comparative information on steel trade globally. This tool was designed to enable users to search for and compare steel trade for multiple Reporting Countries, Partner Countries, Product Groups, or Trade Flows.
        </p>
        <p>
          These visualizations are intended to complement those in the <a href="https://beta.trade.gov/gstm">Global Steel Trade Monitor</a>.  
        </p>
        <p>
          Please select the way that you would like to compare the information.  Click the "Generate Graphs" button below to update the graphs.
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