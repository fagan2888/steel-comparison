import { map, omit, values, isEmpty } from '../../utils/lodash';
import React from 'react';
import PropTypes from 'prop-types';
import FileSaver from 'file-saver';
import config from '../../config';

const DownloadButton = ( {results} ) => {
  if(isEmpty(results.dashboardData))
    return null;
  return (
    <button className="explorer__button explorer__download-button pure-button pure-button-primary" onClick={ () => {downloadReports(results);}}>
      Download Dashboard Data
    </button>
  );
};

export default DownloadButton;

function downloadReports(results){
  const csv_string = buildCSV(results);
  const blob = new Blob([csv_string], {type: 'text/csv;charset=utf-8'});
  FileSaver.saveAs(blob, 'steel-data.csv');
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

export function buildCSV(results){
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
  return csv_string;
}
