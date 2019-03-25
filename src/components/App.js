import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import FormContainer from './FormContainer';

class App extends Component {
  render() {
    return (
      <div>
        <Route path={`/`} render={(props) =>
          <FormContainer {...props} />} />
        <Route path={`/?:query`} render={(props) =>
          <FormContainer {...props} location={props.location} />} />
      </div>
    )
  }
}

export default withRouter(App);