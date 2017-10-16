export default {
  formOptions: {
    "isFetching": false,
    "reporterCountries": [
        {
            "label": "Belgium",
            "value": "Belgium"
        },
        {
            "label": "China",
            "value": "China"
        }
      ],
     "partnerCountries": [
        {
            "label": "All Countries",
            "value": "World"
        },
        {
            "label": "Argentina",
            "value": "Argentina"
        }
      ],
    "productGroups": [
        {
            "label": "All Steel Mill Products",
            "value": "All Steel Mill Products"
        },
        {
            "label": "Flat Products",
            "value": "Flat Products"
        },
        {
            "label": "Long Products",
            "value": "Long Products"
        },
        {
            "label": "Pipe and Tube Products",
            "value": "Pipe and Tube Products"
        },
        {
            "label": "Semi-Finished Products",
            "value": "Semi-Finished Products"
        },
        {
            "label": "Stainless Products",
            "value": "Stainless Products"
        }
    ],
     "flowTypes": [
        {
            "label": "Quantity (Metric Tons)",
            "value": "QTY"
        },
        {
            "label": "Value (US Dollars)",
            "value": "VALUE"
        }
    ],
    "tradeFlows": [
        {
            "label": "Exports",
            "value": "EXP"
        },
        {
            "label": "Imports",
            "value": "IMP"
        }
    ]
  },
  initialValues: {
    "flowType": "QTY",
    "partnerCountries": "World",
    "productGroups": "All Steel Mill Products",
    "reporterCountries": "United States",
    "tradeFlow": "IMP"
  }
}