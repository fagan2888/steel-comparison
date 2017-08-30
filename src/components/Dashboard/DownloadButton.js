import { omit, values } from '../../utils/lodash';
import React, { PropTypes } from 'react';
import FileSaver from 'file-saver';

const DownloadButton = ( {results} ) => {
  return (
    <div>
      <button className="download-button pure-button pure-button-primary" onClick={ () => {downloadReports(results)}}>
        <i className="fa fa-paper-plane" /> Download Data (CSV)
      </button>
      <p> This file download contains a subset of the steel trade data based on the selected filters above. </p>
    </div> 
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

export default DownloadButton;