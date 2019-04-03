import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#GSTM-app');

const ComparisonBarModal = ({modalOpen, closeModal, labels, LabelForSeriesA, data_valuesA, LabelForSeriesB, data_valuesB, title}) => {
	let asteriskCount = 0;
	const formattedData = (dataValue) => {
		if ((dataValue >= 0) && (dataValue < 1)) {
			return parseFloat(dataValue).toLocaleString();
		} else if (dataValue >= 0) {
			return parseFloat(dataValue.toFixed(2)).toLocaleString();
		} else {
			asteriskCount++;
			return '*'
		};
	}

	const table_rows = labels.map((label, i) => {
		return (
			<tr key={i}>
				<td style={cellStyle}>{label}</td>
				<td style={cellStyle}>{formattedData(data_valuesA[i])}</td>
				<td style={cellStyle}>{formattedData(data_valuesB[i])}</td>
			</tr>
		)
	})

	return (
		<Modal
	    isOpen={modalOpen}
	    onRequestClose={closeModal}
	    style={modalStyle}
	    contentLabel="Comparison Bar Graphs Data"
	  >
	  	<h3>{title}</h3>
	  	<table id="ModalTable" className="explorer__modal-table" style={{margin: 'auto', border: '1px solid black', borderCollapse: 'collapse'}}>
	  		<tbody>
		  		<tr>
		  			<th style={headerStyle}>Year</th>
						<th style={headerStyle}>{LabelForSeriesA}</th>
						<th style={headerStyle}>{LabelForSeriesB}</th>
		  		</tr>
					{table_rows}
	  		</tbody>
	  	</table>
			{ (asteriskCount > 0) ? (
				<small>* Asterisk indicates no data available.</small>
			) : null }
	  	<div className="explorer__modal-button-div">
	  		<button className="modalClose" onClick={closeModal} style={modalButtonStyle}>Close</button>
	  	</div>
	  </Modal>
  )
}

export default ComparisonBarModal;

const cellStyle = {textAlign: 'right', padding: '5px', border: '1px solid black', borderCollapse: 'collapse', fontFeatureSettings: 'tnum' };
const headerStyle = {textAlign: 'center', fontWeight: 'bold', padding: '5px', border: '1px solid black', borderCollapse: 'collapse'};
const modalStyle = {
	content: {
		top           : '50%',
    left          : '50%',
    right         : 'auto',
    bottom        : 'auto',
    marginRight   : '-50%',
    transform     : 'translate(-50%, -50%)',
    font		      : '1rem Lato,"Helvetica Neue",Helvetica,Arial,sans-serif'
	}
};
const modalButtonStyle = {
	display           : 'block',
	margin            : 'auto',
	marginTop         : '1rem',
	width             : '20rem',
	fontSize          : '0.9rem',
	lineHeight        : '1',
	padding           : '1.04rem',
	color             : '#fff',
	backgroundColor   : '#0071bc',
	WebkitAppearance  : 'none',
	border            : 'none',
	borderRadius      : '5px',
	cursor            : 'pointer',
	textDecoration    : 'none',
};