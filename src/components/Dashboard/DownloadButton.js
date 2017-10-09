import { map, omit, values } from '../../utils/lodash';
import React from 'react';
import PropTypes from 'prop-types';
import FileSaver from 'file-saver';
import config from '../../config';

const DownloadButton = ( {results} ) => {
  return (
    <button className="button download-button pure-button pure-button-primary" onClick={ () => {downloadReports(results)}}>
      <i className="fa fa-paper-plane" /> Download Selected Trade Data
    </button>
  );
}

export default DownloadButton;

function downloadReports(results){
  const data = results.dashboardData;
  let keys = Object.keys(omit(data.product_group_entry[0], ['id', 'percent_change_ytd']));
  keys = transformKeys(keys);

  let csv_string = '"Selected Data: ' + JSON.stringify(results.query).replace(/{|}|"/g, '').replace(/:/g, ': ').replace(/,/g, ', ') + '"\n';
  csv_string += '"' + config.footnote + '"';

  csv_string += '\n\n';
  csv_string += keys.join(',') + '\n';

  for (let i in data.product_group_entry) {
    csv_string += values(omit(data.product_group_entry[i], ['id', 'percent_change_ytd'])).join(',') + '\n';
  }
  for (let i in data.partner_country_entry) {
    csv_string += values(omit(data.partner_country_entry[i], ['id', 'percent_change_ytd'])).join(',') + '\n';
  }
  const blob = new Blob([csv_string], {type: "text/plain;charset=utf-8"});
  FileSaver.saveAs(blob, "steel-data.csv");
}

function transformKeys(keys){
  return map(keys, key =>{
    if (key.includes('sum'))
      key = key.replace('sum_', '');
    if (key === 'flow_type')
      key = 'Quantity (in metric tons) or Value (in USD)';
    return key;
  });
}
