[![Build Status](https://travis-ci.org/InternationalTradeAdministration/steel-comparison.svg?branch=master)](https://travis-ci.org/InternationalTradeAdministration/steel-comparison)
# Steel Comparison

A search client for comparing data series from the Global Steel Trade Monitor.

## Setup
Install Node.js (this app was developed with LTS v8.16.0).
Then, install dependencies with `npm install`.

Then, `npm run start` runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Running tests
In one terminal tab, launch server with `npm run start`.  
In another terminal tab, launch tests with `npm run test`.  

## Build and Deploy to GitHub Pages
`npm run build && npm run deploy`

## Use as a plugin
Include the build output (e.g. `steel-search.js` and `steel-search.css`) within the head tag, and host those files.
```html
<link rel="stylesheet" type="text/css" href="steel-search.css">
<script type="text/javascript" src="steel-search.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    var BASE_URL = 'https://api.trade.gov/v1/steel_data/search';
    var API_KEY = 'your_API_KEY'; // get it from http://api.trade.gov/
    var divID = 'GSTM-app'; // Or the ID of the div where you'd like it to appear
    window.Explorer.renderSteelSearch(divID, BASE_URL, API_KEY);
  });
</script>
```
Then, place the element `div id="GTSM-app"></div>` in the `<body>`.

## Additional Info
* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), and then ejected to enable customization of webpack.
* Two polyfill packages are implemented to support IE11: `react-app-polyfill/ie11`, and `babel-polyfill`.  They must be imported *in that order* in `src/index.js`.  Eventually, if IE11 support is no longer required, those two import statements (and the `babel-polyfill` npm package) can be safely removed.