import React from 'react';
import { connect } from 'react-redux';

const App = ({ test }) => (
  <div>
    <h1>Isomorphic React App {test}</h1>
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  ...state,
});

export default connect(mapStateToProps)(App);
