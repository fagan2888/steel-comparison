import { map } from '../../../utils/lodash';
import React from 'react';
import Modal from 'react-modal';
import styles from './styles';

const YearlyBarModal = ({modalOpen, closeModal, labels, data, query, title}) => {
	const units = query.flow_type === 'QTY' ? 'Thousands of Metric Tons' : 'Thousands of U.S. Dollars'
	const table_rows = map(labels, (label, i) => {
		return (
			<tr key={label + data[i]}>
  			<td>{label}</td>
  			<td>{parseFloat(data[i].toFixed(2)).toLocaleString()}</td>
  		</tr>
		)
	});

	return(
		<Modal
	    isOpen={modalOpen}
	    onRequestClose={closeModal}
	    style={styles}
	    contentLabel="Yearly Bar Graph Data"
	  >
	  	<h3>{title}</h3>
	  	<table className="explorer__modal-table">
	  		<tbody>
		  		<tr>
		  			<th>Time Period</th>
		  			<th>Value</th>
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

export default YearlyBarModal;