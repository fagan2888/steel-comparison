import { values, capitalize, compact, has, map, omit, remove } from '../utils/lodash';

export function buildAggResults(raw_results, agg_results, params) {

  for (let i in raw_results) {
    let entry = raw_results[i];
    let reporter = entry.reporter_country;
    if ( has(params, 'partner_countries')){
      aggregateByPartner(agg_results, reporter, entry);
    }

    else if ( has(params, 'product_groups')){
      aggregateByProductGroup(agg_results, reporter, entry);
    }
  }

  return agg_results;
}

function aggregateByPartner(agg_results, reporter, entry){
  if ( !has(agg_results, reporter)) {
    agg_results[reporter] = blankAggEntry(entry, 'partner_countries');
  }
  if ( !has(agg_results[reporter]['entries'], entry.partner_country)) {
    
    let first_entry = omit(entry, ['id', 'partner_country', 'reporter_country', 'partner_country_code']);
    agg_results[reporter]['entries'][entry.partner_country] = [first_entry];
  }
  else {
    let new_entry = omit(entry, ['id', 'partner_country', 'reporter_country', 'partner_country_code']);
    agg_results[reporter]['entries'][entry.partner_country].push(new_entry);
  }
  agg_results[reporter]['entries'][entry.partner_country].sort(compare);
}

function aggregateByProductGroup(agg_results, reporter, entry){
  if ( !has(agg_results, reporter)) {
    agg_results[reporter] = blankAggEntry(entry, 'product_groups');
  }
  if ( !has(agg_results[reporter]['entries'], entry.product_group)) {
    let first_entry = omit(entry, ['id', 'product_group', 'reporter_country', 'partner_country_code']);
    agg_results[reporter]['entries'][entry.product_group] = [first_entry];
  }
  else {
    let new_entry = omit(entry, ['id', 'product_group', 'reporter_country', 'partner_country_code']);
    agg_results[reporter]['entries'][entry.product_group].push(new_entry);
  }
  agg_results[reporter]['entries'][entry.product_group].sort(compare);
}

function blankAggEntry(raw_entry, report_type) {
  const return_obj =
    {
      reporter: raw_entry.reporter_country,
      report_type: report_type,
      entries: {}
    };
  return return_obj;
}

function compare(a,b) {
  if (a.sum_2016 < b.sum_2016)
    return 1;
  if (a.sum_2016 > b.sum_2016)
    return -1;
  return 0;
}