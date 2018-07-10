import React from 'react';
import { connect } from 'react-redux';

import { QuestionList } from './components';

const App = () => (
  <div>
    <h1>Isomorphic React App</h1>
    <div>
      <QuestionList />
    </div>
  </div>
);



export default connect()(App);
