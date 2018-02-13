import { map } from '../../../utils/lodash';
import React from 'react';
import Modal from 'react-modal';

const styles = {
	content:{
		top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
	}
};

const ComparisonBarModal = ({modalOpen, closeModal, labels, data, query, title}) => {
	const units = query.flow_type === 'QTY' ? 'Thousands of Metric Tons' : 'Thousands of U.S. Dollars'
	const table_headers = map(labels, (label) => {
		return <th key={label}>{label}</th>;
	});

	const table_rows = map(data, (entry) => {
		const data_cells = map(entry.data, (data_value) => {
			return <td key={data_value}>{data_value.toFixed(2)}</td>
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
	  	<button onClick={closeModal}>Close</button>
	  </Modal>
  )
}

export default ComparisonBarModal;