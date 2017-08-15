import React, { PropTypes } from 'react';
import YearlyBarGraph from './YearlyBarGraph';
import ComparisonBarGraphs from './ComparisonBarGraphs';
import PieGraphs from './PieGraphs';
import { compact, get, isEmpty, map, startCase } from '../../utils/lodash';

const Detail = ({ result, query, form_options }) => {

  const ReportDashboard = ({result}) => {
    return (
      <div key={result.reporter_country}>
        <YearlyBarGraph result={result} params={query} last_updated={result.source_last_updated} />

        <ComparisonBarGraphs result={result} query={query} form_options={form_options.timePeriods} />

        <PieGraphs result={result} query={query} form_options={form_options.timePeriods} />
      </div>
    );
  }

  return (
    <ReportDashboard result={result} />
  )
};
Detail.propTypes = {
  result: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  form_options: PropTypes.object.isRequired
};

export default Detail;
