import { map } from '../../../utils/lodash';
import React from 'react';
import Modal from 'react-modal';
import styles from './styles';

const ComparisonBarModal = ({modalOpen, closeModal, labels, data, query, title}) => {
	const units = query.flow_type === 'QTY' ? 'Thousands of Metric Tons' : 'Thousands of U.S. Dollars'
	const table_headers = map(labels, (label) => {
		return <th key={label}>{label}</th>;
	});

	const table_rows = map(data, (entry) => {
		const data_cells = map(entry.data, (data_value) => {
			return <td key={data_value}>{parseFloat(data_value.toFixed(2)).toLocaleString()}</td>
		});
		return (
			<tr key={entry.label + entry.data[0]}>
  			<th>{entry.label}</th>
  			{data_cells}
  		</tr>
		);
	});

	return(
		<Modal
	    isOpen={modalOpen}
	    onRequestClose={closeModal}
	    style={styles}
	    contentLabel="Comparison Bar Graphs Data"
	  >
	  	<h3>{title}</h3>
	  	<table className="explorer__modal-table">
	  		<tbody>
		  		<tr>
		  			<th></th>
		  			{table_headers}
		  		</tr>
		  		{table_rows}
	  		</tbody>
	  	</table>
	  	<div className="explorer__modal-button-div">
	  		<button className="explorer__button" onClick={closeModal}>Close</button>
	  	</div>
	  </Modal>
  )
}

export default ComparisonBarModal;