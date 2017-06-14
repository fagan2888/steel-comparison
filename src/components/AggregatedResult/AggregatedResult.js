import { isEmpty, map, omit, has } from '../../utils/lodash';
import React, { PropTypes } from 'react';
import Item from './Item';
import Pages from './Pages';
import './Result.scss';
import moment from 'moment';
import FileSaver from 'file-saver';

const ResultCountLabel = ({ count, query }) => {
  let text = '';
  if (!isEmpty(omit(query, ['offset', 'percent_change']))) {
    if (count === 1) text = ` report found.`;
    else text = ` reports found.`;
  }
  if (text == '') count = '';
  
  return <span className="result-count-label"><div className="result-count">{count}</div>{text}</span>;
};
ResultCountLabel.propTypes = {
  count: PropTypes.number.isRequired,
  query: PropTypes.object,
};

const AggregatedResult = ({ onPaging, query = {}, results }) => {

  if (results.isFetchingAggs) return null;
  if (results.error != "") 
    return (<div className="explorer__result">{results.error}</div>);

  const items = map(results.pageItems, result => {
    const key = Object.keys(result)[0];
    return <Item key={key} result={result[key]} link_text={key}/>
  });

  const pagesProps = {
    current: Math.ceil((results.offset ? results.offset : 0) / 10) + 1,
    displayed: 5,
    total: Math.ceil(results.aggregatedItems.length / 10),
    handleClick: onPaging,
  };

  return (
    <div className="explorer__result">
      <ResultCountLabel count={results.aggregatedItems.length} query={query} />
      {items}
      <Pages {...pagesProps} />
    </div>
  );
};
AggregatedResult.propTypes = {
  onPaging: PropTypes.func.isRequired,
  query: PropTypes.object,
  results: PropTypes.object,
};

export default AggregatedResult;
