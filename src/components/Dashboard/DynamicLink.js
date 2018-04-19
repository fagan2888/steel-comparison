import { map, omit, values, isEmpty } from '../../utils/lodash';
import React from 'react';
import PropTypes from 'prop-types';

const TRADE_FLOWS = {
	'IMP': 'Imports',
	'EXP': 'Exports'	
};

const URLS = {
	'EXP': {
		'China': 'https://www.trade.gov/steel/countries/pdfs/exports-china.pdf',
		'Japan': 'https://www.trade.gov/steel/countries/pdfs/exports-japan.pdf',
		'Russia': 'https://www.trade.gov/steel/countries/pdfs/exports-russia.pdf',
		'Korea': 'https://www.trade.gov/steel/countries/pdfs/exports-korea.pdf',
		'Germany': 'https://www.trade.gov/steel/countries/pdfs/exports-germany.pdf',
		'Ukraine': 'https://www.trade.gov/steel/countries/pdfs/exports-ukraine.pdf',
		'Italy': 'https://www.trade.gov/steel/countries/pdfs/exports-italy.pdf',
		'Belgium': 'https://www.trade.gov/steel/countries/pdfs/exports-Belgium.pdf',
		'Turkey': 'https://www.trade.gov/steel/countries/pdfs/exports-Turkey.pdf',
		'France': 'https://www.trade.gov/steel/countries/pdfs/exports-France.pdf',
		'Brazil': 'https://www.trade.gov/steel/countries/pdfs/exports-Brazil.pdf',
		'Taiwan': 'https://www.trade.gov/steel/countries/pdfs/exports-Taiwan.pdf',
		'Netherlands': 'https://www.trade.gov/steel/countries/pdfs/exports-dutch.pdf',
		'India': 'https://www.trade.gov/steel/countries/pdfs/exports-India.pdf',
		'Spain': 'https://www.trade.gov/steel/countries/pdfs/exports-Spain.pdf',
		'United States': 'https://www.trade.gov/steel/countries/pdfs/exports-us.pdf',
		'Austria': 'https://www.trade.gov/steel/countries/pdfs/exports-Austria.pdf',
		'Canada': 'https://www.trade.gov/steel/countries/pdfs/exports-Canada.pdf',
		'Poland': 'https://www.trade.gov/steel/countries/pdfs/exports-Poland.pdf',
		'Slovakia': 'https://www.trade.gov/steel/countries/pdfs/exports-Slovakia.pdf',
		'Iran': 'https://www.trade.gov/steel/countries/pdfs/exports-iran.pdf'
	},

	'IMP': {
		'United States': 'https://www.trade.gov/steel/countries/pdfs/imports-us.pdf',
		'Germany': 'https://www.trade.gov/steel/countries/pdfs/imports-germany.pdf',
		'Korea': 'https://www.trade.gov/steel/countries/pdfs/imports-korea.pdf',
		'Italy': 'https://www.trade.gov/steel/countries/pdfs/imports-italy.pdf',
		'Thailand': 'https://www.trade.gov/steel/countries/pdfs/imports-thailand.pdf',
		'Turkey': 'https://www.trade.gov/steel/countries/pdfs/imports-Turkey.pdf',
		'France': 'https://www.trade.gov/steel/countries/pdfs/imports-France.pdf',
		'China': 'https://www.trade.gov/steel/countries/pdfs/imports-china.pdf',
		'Belgium': 'https://www.trade.gov/steel/countries/pdfs/imports-Belgium.pdf',
		'Poland': 'https://www.trade.gov/steel/countries/pdfs/imports-Poland.pdf',
		'India': 'https://www.trade.gov/steel/countries/pdfs/imports-India.pdf',
		'Mexico': 'https://www.trade.gov/steel/countries/pdfs/imports-Mexico.pdf',
		'Spain': 'https://www.trade.gov/steel/countries/pdfs/imports-Spain.pdf',
		'Netherlands': 'https://www.trade.gov/steel/countries/pdfs/imports-dutch.pdf',
		'Malaysia': 'https://www.trade.gov/steel/countries/pdfs/imports-Malaysia.pdf',
		'Philippines': 'https://www.trade.gov/steel/countries/pdfs/imports-Philippines.pdf',
		'Taiwan': 'https://www.trade.gov/steel/countries/pdfs/imports-Taiwan.pdf',
		'Canada': 'https://www.trade.gov/steel/countries/pdfs/imports-Canada.pdf',
		'United Kingdom': 'https://www.trade.gov/steel/countries/pdfs/imports-UK.pdf',
		'Czech Republic': 'https://www.trade.gov/steel/countries/pdfs/imports-Czech.pdf',
	}
};

const DynamicLink = ({query}) => {
	if(isEmpty(query))
		return null;
	const reporter_country = query.reporter_countries;
	const trade_flow = query.trade_flow;
	const trade_flow_text = TRADE_FLOWS[trade_flow];
	return(
			<button className="explorer__button explorer__dynamic-button pure-button pure-button-primary" onClick={() => {return window.open(URLS[trade_flow][reporter_country], '_blank')}} >
				{'View ' + reporter_country + ' ' + trade_flow_text + ' ' + 'Reports'}
			</button>
		)
}

export default DynamicLink;