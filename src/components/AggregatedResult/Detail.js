import React, { PropTypes } from 'react';
import { Row, UnorderedList, } from './DetailItem';
import { LineGraph } from './Graphs';
import YearlyBarGraph from './YearlyBarGraph';
import ProductGroupBarGraph from './ProductGroupBarGraph';
import ProductGroupPie from './ProductGroupPie';
import PartnerCountryPie from './PartnerCountryPie';
import PartnerCountryBarGraph from './PartnerCountryBarGraph';
import { compact, get, isEmpty, map, startCase } from '../../utils/lodash';

const Detail = ({ result, query }) => {
  const ReportHeading = ({ reporter }) => {
    return <h1>Steel Exports for {reporter}</h1>;
  }

  const ReportDashboard = ({result}) => {
    return (
      <div key={result.reporter_country}>
        <YearlyBarGraph data={result.product_group_entry} params={query} />
        <ProductGroupBarGraph data={result.product_group_entry} params={query} />
        <PartnerCountryBarGraph data={result.partner_country_entry} params={query} />
        <ProductGroupPie data={result.product_group_entry} params={query} />
        <PartnerCountryPie data={result.partner_country_entry} params={query} />
        <br />
        <br />

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
      <ReportHeading reporter={result.reporter_country} />

      <ReportDashboard result={result} />
    </div>
  )
};
Detail.propTypes = {
  result: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired
};

export default Detail;
