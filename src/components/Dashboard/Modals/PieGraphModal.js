import { map } from '../../../utils/lodash';
import React from 'react';
import Modal from 'react-modal';
import styles from './styles';

const PieGraphModal = ({modalOpen, closeModal, labels, data, query, title, key_type}) => {
	const units = query.flow_type === 'QTY' ? 'Thousands of Metric Tons' : 'Thousands of U.S. Dollars'
	const table_rows = map(data[0].data, (data_value, i) => {
		return (
			<tr key={labels[i] + data_value}>
  			<td>{labels[i]}</td>
  			<td>{data_value + '%'}</td>
  		</tr>
		);
	});

	return(
		<Modal
	    isOpen={modalOpen}
	    onRequestClose={closeModal}
	    style={styles}
	    contentLabel="Pie Graphs Graphs Data"
	  >
	  	<h3>{title}</h3>
	  	<table className="explorer__modal-table">
	  		<tbody>
		  		<tr>
		  			<th>{key_type}</th>
		  			<th>Value</th>
		  		</tr>
		  		{table_rows}
	  		</tbody>
	  	</table>
	  	<div className="explorer__modal-button-div">
	  		<button className="explorer__button explorer__modal-button" onClick={closeModal}>Close</button>
	  	</div>
	  </Modal>
  )
}

export default PieGraphModal;