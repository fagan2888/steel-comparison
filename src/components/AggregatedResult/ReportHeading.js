import { isEmpty, map, omit, has, values } from '../../utils/lodash';
import React, { PropTypes } from 'react';
import FileSaver from 'file-saver';

const ReportHeading = ({ query, results }) => {
  let flow = query.trade_flow === 'EXP' ? 'Exports' : 'Imports';
  return (
    <div>
      <h1 className="dashboard-heading">
        Steel {flow} for {results.reporter_country}  
        <DownloadButton results={results} />
      </h1>
    </div>
  );
}

const DownloadButton = ( {results} ) => {
  return (
    <button className="download-button pure-button pure-button-primary" onClick={ () => {downloadReports(results)}}>
      <i className="fa fa-paper-plane" /> Download Data (CSV)
    </button> 
  );
}

function downloadReports(results){
  const keys = Object.keys(omit(results.product_group_entry[0], 'id'));
  let csv_string = keys.join(',') + '\n';
  for (let i in results.product_group_entry) {
    csv_string += values(omit(results.product_group_entry[i], 'id')).join(',') + '\n';
  }
  for (let i in results.partner_country_entry) {
    csv_string += values(omit(results.partner_country_entry[i], 'id')).join(',') + '\n';
  }
  const blob = new Blob([csv_string], {type: "text/plain;charset=utf-8"});
  FileSaver.saveAs(blob, "steel-data.csv");
}

export default ReportHeading;