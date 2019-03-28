import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Form from './Form';
import config from '../config';
import './App.css';

class FormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comparisonType: "",
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
        <h1 className="Header-1"><a href={config.monitor_link} target="_blank" rel="noopener noreferrer"><b>Global Steel Trade Monitor Comparison Dashboard</b></a></h1>
        <p className="DefaultParagraph-1">
          Search for and compare steel trade for multiple Reporting Countries, Partner Countries, Product Groups, or Trade Flows. Click Generate Dashboard to update the graphs.
        </p>
        <p>
          Compare trade data between two or more reporter countries, partner countries or product groups. Please select the way that you would like to compare the information.
        </p>
        <fieldset onChange={this.handleChangeComparisonType} id="comparisonType">
          <legend>Select a type of comparison:</legend>
          <input type="radio" name="comparisonType" value="Reporting Countries" id="two-reporting-countries" />
          <label htmlFor="two-reporting-countries">Two Reporting Countries</label><br />

          <input type="radio" name="comparisonType" value="Partner Countries" id="two-partner-countries" />
          <label htmlFor="two-partner-countries">Two Partner Countries</label><br />

          <input type="radio" name="comparisonType" value="Product Groups" id="two-product-groups" />
          <label htmlFor="two-product-groups">Two Product Groups</label><br />

          <input type="radio" name="comparisonType" value="Trade Flows" id="two-trade-flows" />
          <label htmlFor="two-trade-flows">Two Trade Flows</label><br />
        </fieldset>
        {this.state.comparisonType ?
          <Form
            comparisonType={this.state.comparisonType}
            tradeRepository = {this.props.tradeRepository}
          />
          : null}
        <button onClick={topFunction} id="BackToTop">Back to Top</button>
      </div>
    );
  }
}

export default withRouter(FormContainer);