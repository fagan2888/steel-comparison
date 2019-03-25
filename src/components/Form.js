import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import Loader from 'react-loader-spinner';
import GraphCollection from './GraphCollection';
import config from '../config.js';
import { searchQuery } from '../utils/searchQuery';

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      TradeFlow: { value: "IMP", label: "Imports" },
      FlowType: { value: "QTY", label: "Quantity (Metric Tons)" },

      ReporterCountry1: { value: "United States", label: "United States" },
      ReporterCountry2: { value: "", label: "Select second Reporting Country" },

      PartnerCountry1: { value: "World", label: "All Countries" },
      PartnerCountry2: { value: "", label: "Select second Partner Country" },

      ProductGroup1: { value: "", label: "Select Product Group" },
      ProductGroup2: { value: "", label: "Select second Product Group" },

      submitted: false,
      message: "",
    };
    this.handleSelect = this.handleSelect.bind(this);
  };

  handleSelect(name, option) {
    this.setState({ [name]: option });
  };

  componentDidUpdate(prevProps) {
    if (this.props.comparisonType !== prevProps.comparisonType) {
      // if the comparison type changes, optional selections revert to default so they don't accidentally get sent
      this.setState({
        ProductGroup1: { value: "", label: "Select Product Group" },
        ProductGroup2: { value: "", label: "Select second Product Group" },
        ReporterCountry2: { value: "", label: "Select second Reporting Country" },
        PartnerCountry2: { value: "", label: "Select second Partner Country" },

        submitted: false,
        message: ""
      });
    }
  };

  formValidation = () => {
    const { comparisonType } = this.props;
    const { ReporterCountry2, PartnerCountry2, ProductGroup1, ProductGroup2 } = this.state;
    let errorMessage;
    if ((comparisonType === "Reporting Countries") && (!ReporterCountry2.value)) {
      errorMessage = "Must select 2nd Reporting Country";
    } else if ((comparisonType === "Partner Countries") && (!PartnerCountry2.value)) {
      errorMessage = "Must select 2nd Partner Country";
    } else if ((comparisonType === "Product Groups") && ((!ProductGroup1.value) || (!ProductGroup2.value))) {
      errorMessage = "Must select two Product Groups";
    } else errorMessage = "";
    return errorMessage;
  }

  handleSubmit = (event) => {
    let errorMessage = this.formValidation();
    if (errorMessage === "") {
      this.setState({ submitted: true, message: "" })
      this.props.history.push({ search: `${searchQuery(this.state, this.props.comparisonType)}` });
      event.preventDefault();
    } else {
      this.setState({ message: errorMessage });
      event.preventDefault();
    }
  };

  render() {
    return (
      <div>
        <h3>Comparing {this.props.comparisonType}</h3>
        <p>
          {config.instructions[this.props.comparisonType]}
        </p>
        <p>
          Please cite the data and graphs as: U.S. Department of Commerce, Enforcement and Compliance using data from IHS Markit - Global Trade Atlas sourced from the reporting country's official statistics.
        </p>
        <p><b>All fields are required.</b>  <a href={config.faqs_link} target="_blank" rel="noopener noreferrer">FAQs</a></p>

        {this.props.loadingForm ? <div className="spinner"><Loader type="ThreeDots" color="#00CC66" width="100" /></div> : (
          <form onSubmit={this.handleSubmit}>
            <b>Trade Flow: </b><br /><p>Direction of trade: exports or imports</p>
            {this.props.comparisonType === "Trade Flows" ? (
              <Select
                name="TradeFlow"
                className="TradeFlow"
                options={[{ value: "", label: "Imports and Exports" }]}
                value={{ value: "", label: "Imports and Exports" }}
                isMulti
                isClearable={false}
                styles={TradeFlowStyles}
                onChange={option => this.handleSelect("TradeFlow", option)}
                aria-label="Select Trade Flow"
              />
            ) : (
                <Select
                  name="TradeFlow"
                  className="TradeFlow"
                  value={this.state.TradeFlow}
                  defaultValue={{ value: "IMP", label: "Imports" }}
                  onChange={option => this.handleSelect("TradeFlow", option)}
                  options={[{ value: "IMP", label: "Imports" }, { value: "EXP", label: "Exports" }]}
                  aria-label="Select Trade Flow"
                />
              )}
            <br />
            <b>Reporting Country: </b><br /><p>A country reporting steel trade from either its exporting or importing perspective</p>
            <Select
              name="ReporterCountry1"
              className="ReportingCountries"
              options={this.props.ReporterOptions}
              value={this.state.ReporterCountry1}
              onChange={(option) => this.handleSelect("ReporterCountry1", option)}
              aria-label="Select Reporting Country"
            />
            {this.props.comparisonType === "Reporting Countries" ? (
              <Select
                name="ReporterCountry2"
                className="ReportingCountries"
                options={this.props.ReporterOptions}
                value={this.state.ReporterCountry2}
                onChange={(option) => this.handleSelect("ReporterCountry2", option)}
                aria-label="Select Second Reporting Country"
              />
            ) : null}
            <br />
            <b>Partner Country: </b><br /><p>Destination of a reporting country’s steel exports or imports</p>
            <Select
              name="PartnerCountry1"
              className="PartnerCountries"
              options={this.props.PartnerOptions}
              value={this.state.PartnerCountry1}
              onChange={(option) => this.handleSelect("PartnerCountry1", option)}
              aria-label="Select Partner Country"
            />
            {this.props.comparisonType === "Partner Countries" ? (
              <Select
                name="PartnerCountry2"
                className="PartnerCountries"
                options={this.props.PartnerOptions}
                value={this.state.PartnerCountry2}
                onChange={(option) => this.handleSelect("PartnerCountry2", option)}
                aria-label="Select Second Partner Country"
              />
            ) : null}
            {this.props.comparisonType === "Product Groups" ? (
              <>
                <br />
                <b>Product Group: </b><br /><p>Steel Mill Products are contained in Flat, Long, Pipe/Tube, Semi-Finished or Stainless products. <a href="https://www.trade.gov/steel/pdfs/product-definitions.pdf" target="_blank" rel="noopener noreferrer">More Information.</a></p>
                <Select
                  name="ProductGroup1"
                  className="ProductGroups"
                  options={this.props.ProductGroupOptions}
                  value={this.state.ProductGroup1}
                  onChange={(option) => this.handleSelect("ProductGroup1", option)}
                  aria-label="Select Product Group"
                />
                <Select
                  name="ProductGroup2"
                  className="ProductGroups"
                  options={this.props.ProductGroupOptions}
                  value={this.state.ProductGroup2}
                  onChange={(option) => this.handleSelect("ProductGroup2", option)}
                  aria-label="Select Second Product Group"
                />
              </>
            ) : null}
            <br />
            <b>Quantity or Value</b><br /><p>Unit of measure - either metric tons or U.S. dollars.</p>
            <Select
              name="FlowType"
              className="FlowType"
              options={[{ value: "QTY", label: "Quantity (Metric Tons)" }, { value: "VALUE", label: "Value (US Dollars)" }]}
              value={this.state.FlowType}
              onChange={(option) => this.handleSelect("FlowType", option)}
              aria-label="Select Flow Type"
            />
            <button type="submit" onSubmit={this.handleSubmit}>Generate Graphs</button>
            <button><a href={config.monitor_link} target="_blank" rel="noopener noreferrer">Return to the Global Steel Trade Monitor</a></button>
          </form>
        )}
        <h3 className="message">{this.state.message}</h3>
        <GraphCollection
          tradeRepository={this.props.tradeRepository}
          comparisonType={this.props.comparisonType}
          submitted={this.state.submitted}
        />
      </div>
    )
  }
};

export default withRouter(Form);

const TradeFlowStyles = {
  multiValue: (base) => {
    return { ...base, backgroundColor: '#0071bc' };
  },
  multiValueLabel: (base) => {
    return { ...base, fontWeight: 'bold', color: 'white', paddingRight: 6 };
  },
  multiValueRemove: (base) => {
    return { ...base, display: 'none' };
  },
};