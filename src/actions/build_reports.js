import { values, capitalize, compact, has, map, snakeCase } from '../utils/lodash';
import { calculatePercentageChange, filterValuesForInterval } from './shared_functions.js';
import { performSort } from './sort_reports.js';

export function buildReports(agg_results, params){
  const keys = Object.keys(agg_results);
  const vals = values(agg_results);

  const agg_results_as_array = [];
  for (let i in keys) {
    let key = keys[i];
    let obj = {};
    obj[key] = vals[i];
    agg_results_as_array.push(obj);
  }

  return agg_results_as_array;
}
