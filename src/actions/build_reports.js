import { values, capitalize, compact, has, map, snakeCase, isEmpty } from '../utils/lodash';
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

function addTotalsEntry(agg_results){
  for (let key in agg_results) {
    let report = agg_results[key];

    for (let k in report.entries) {
      let entries = report.entries[k];
      let totals_entry = {};
      for (let i in entries){
        let entry = entries[i];

        if (isEmpty(totals_entry))
          totals_entry = newTotalsEntry(totals_entry, entry);
        else
          totals_entry = updateTotalsEntry(totals_entry, entry);
      }
      totals_entry = calculateTotalsPercentChange(totals_entry);
      entries.push(totals_entry);
      entries.sort(compare);
    }
  }
}

function newTotalsEntry(totals_entry, entry){
  Object.assign(totals_entry, entry);
  if ('partner_country' in totals_entry)
    totals_entry['partner_country'] = 'Total';
  else
    totals_entry['product_group'] = 'Total';
  return totals_entry;
}

function calculateTotalsPercentChange(totals_entry){
  totals_entry['percent_change_ytd'] = (totals_entry['ytd_2017'] - totals_entry['ytd_2016']) / totals_entry['ytd_2016'] * 100;
  return totals_entry;
}

function updateTotalsEntry(totals_entry, entry) {
  for (let k in totals_entry) {
    if (k.includes('sum') || k.includes('ytd')) {
      let sum_entry = totals_entry[k];
      totals_entry[k] += entry[k];
    }
  }
  return totals_entry;
}

function compare(a,b) {
  if (a.sum_2016 < b.sum_2016)
    return 1;
  if (a.sum_2016 > b.sum_2016)
    return -1;
  return 0;
}

