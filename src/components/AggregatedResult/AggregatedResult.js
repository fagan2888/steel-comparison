import { isEmpty, map, omit, has } from '../../utils/lodash';
import React, { PropTypes } from 'react';
import Detail from './Detail';
import './Result.scss';
import moment from 'moment';

const AggregatedResult = ({ query = {}, results }) => {
  if (results.isFetchingAggs) return null;
  if (results.error != "") 
    return (<div className="explorer__result">{results.error}</div>);
  if (isEmpty(results.dashboardData))
    return (<h3> Choose a search option from each field to generate a report </h3>);

  return (
    <div className="explorer__result">
      <Detail key='explorer__result' result={results.dashboardData} query={query} />
    </div>
  );
};
AggregatedResult.propTypes = {
  query: PropTypes.object,
  results: PropTypes.object,
};

export default AggregatedResult;
