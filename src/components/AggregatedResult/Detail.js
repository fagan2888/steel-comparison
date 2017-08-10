import React, { PropTypes } from 'react';
import YearlyBarGraph from './YearlyBarGraph';
import ComparisonBarGraphs from './ComparisonBarGraphs';
import PieGraphs from './PieGraphs';
import { compact, get, isEmpty, map, startCase } from '../../utils/lodash';

const Detail = ({ result, query, form_options }) => {

  const ReportDashboard = ({result}) => {
    return (
      <div key={result.reporter_country}>
        <YearlyBarGraph data={result.product_group_entry} params={query} last_updated={result.source_last_updated} />
        <br />
        <ComparisonBarGraphs result={result} query={query} form_options={form_options.timePeriods} />
        <br />
        <PieGraphs result={result} query={query} form_options={form_options.timePeriods} />
      </div>
    );
  }

  const TableColumns = ({entry}) => {
    const items = map(entry, (v, k) => {
      if (!isNaN(parseFloat(v))){
        v = parseFloat(v).toFixed(2);
      }
      return <td key={k}>{v}</td>;
    });

    return <tr>{items}</tr>;
  }

  const ReportTable = ({data}) => {
    
    const headers = map(data[0], (v, k) => {
      return <th key={k}>{startCase(k).replace("Sum ", "")}</th>;
    });

    const rows = map(data, (v, i) => {
      return <TableColumns key={i} entry={v} />;
    });

    return (
      <table className="explorer__result-item__detail"><tbody><tr>{headers}</tr>{rows}</tbody></table>
    );
  }

  return (
    <div id="report">
      <ReportDashboard result={result} />
    </div>
  )
};
Detail.propTypes = {
  result: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  form_options: PropTypes.object.isRequired
};

export default Detail;
