import React, { PropTypes } from 'react';
import { Row, UnorderedList, } from './DetailItem';
import { LineGraph } from './Graphs';
import Collapse from 'rc-collapse';
import 'rc-collapse/assets/index.css';
import { compact, get, isEmpty, map, startCase } from '../../utils/lodash';

const Detail = ({ result }) => {
  const ReportHeading = ({ result_key }) => {
    if (result_key === 'partner_countries')
      return <h3>Partner Countries:</h3>;
    else if (result_key === 'product_groups')
      return <h3>Product Groups:</h3>;
    else
      return null;
  }

  const ReportCollapse = ({result, report_type}) => {
    const items = map(result, (v, k) => {
      return (
        <Collapse.Panel key={k} header={k}>
          <LineGraph data={v} report_type={report_type}/>
          <br />
          <br />
          <ReportTable data={v} />
        </Collapse.Panel>
      );
    });
    return (
      <Collapse accordion={false}>
        {items}
      </Collapse>
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

  const report_type_key = result.report_type;
  return (
    <div id="report">
    <ReportHeading result_key={report_type_key} />

    <ReportCollapse result={result.entries} report_type={report_type_key}/>
    </div>
  )
};
Detail.propTypes = {
  result: PropTypes.object.isRequired
};

export default Detail;
