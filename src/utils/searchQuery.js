export function searchQuery(params, comparisonType) {
  let reporter_countries;
  let partner_countries;
  let product_groups;
  let trade_flow; // if both, send neither
  let flow_type = params.FlowType.value; 

  if (!!params.ReporterCountry2.value) {
    reporter_countries = `${params.ReporterCountry1.value},${params.ReporterCountry2.value}`
  } else { reporter_countries = `${params.ReporterCountry1.value}`};

  if (!!params.PartnerCountry2.value) {
    partner_countries = `${params.PartnerCountry1.value},${params.PartnerCountry2.value}`
  } else { partner_countries = `${params.PartnerCountry1.value}`}

  if (!!params.ProductGroup1.value) {
    product_groups = `${params.ProductGroup1.value},${params.ProductGroup2.value}`
    // if we don't specify the first product, we want all product groups
  } else { product_groups = "" }

  if (comparisonType === "Trade Flows") {
    // if comparing on the basis of trade flow, include neither in the string
    trade_flow = ""
  } else trade_flow = `${params.TradeFlow.value}`


  return `trade_flow=${trade_flow}&reporter_countries=${reporter_countries}&partner_countries=${partner_countries}&product_groups=${product_groups}&flow_type=${flow_type}`;
}