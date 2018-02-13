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

const YearlyBarModal = ({modalOpen, closeModal, labels, data, query, title}) => {
	const units = query.flow_type === 'QTY' ? 'Thousands of Metric Tons' : 'Thousands of U.S. Dollars'
	const table_rows = map(labels, (label, i) => {
		return (
			<tr key={label + data[i]}>
  			<td>{label}</td>
  			<td>{data[i].toFixed(2)}</td>
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
		  			<th>{'Value - ' + units}</th>
		  		</tr>
		  		{table_rows}
	  		</tbody>
	  	</table>
	  <button onClick={closeModal}>Close</button>
	  </Modal>
  )
}

export default YearlyBarModal;