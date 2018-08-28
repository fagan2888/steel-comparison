Steel Search
=====================

A search client for Global Steel Trade Data.

### Setup

```
npm install
npm start
open http://localhost:3001
```

See instructions here for setting up the search API locally:  https://github.com/InternationalTradeAdministration/webservices.

### Linting

This boilerplate project includes React-friendly ESLint configuration.

```
npm run lint
```

### Running Jest Specs

```
npm run test
npm run test relative/path/to/file.spec.js
```

### Build & Deploy to GitHub Page

```
npm run build && npm run deploy
```

### Use as a plugin.

Include the build output (e.g. `bundle.js` and `explorer.css`) within the `head` tag.
```html
<html>
  <head>
    ...
    <script src="bundle.js"></script> 
    <link href="explorer.css"></script> 
    ...
  </head>
  <body>
  ...
    <div id="main"></div>
    <script>
      // Explorer is provided by bundle.js.
      // Explorer.render(<elementId>) must be called after the DOM element.
      Explorer.render('main')
    </script>
  </body>
</html>
```

### Dependencies

* React
* Webpack
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* [babel-loader](https://github.com/babel/babel-loader)
* [react-hot-loader](https://github.com/gaearon/react-hot-loader)
