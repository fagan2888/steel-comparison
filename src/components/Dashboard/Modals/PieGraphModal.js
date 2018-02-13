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

const PieGraphModal = ({modalOpen, closeModal, labels, data, query, title}) => {
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
		  			<th>Country or Product Group</th>
		  			<th>Value</th>
		  		</tr>
		  		{table_rows}
	  		</tbody>
	  	</table>
	  	<button onClick={closeModal}>Close</button>
	  </Modal>
  )
}

export default PieGraphModal;