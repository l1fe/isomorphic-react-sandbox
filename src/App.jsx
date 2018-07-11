import React from 'react';
import { connect } from 'react-redux';
import { Route, Link, withRouter } from 'react-router-dom';

import { QuestionList, QuestionDetail } from './components';

const App = () => (
  <div>
    <Link to="/">
      <h1>Isomorphic React App</h1>
    </Link>
    <div>
      <Route exact path="/" render={() => <QuestionList />} />
      <Route
        exact
        path="/questions/:id"
        render={({ match }) =>
          <QuestionDetail question_id={match.params.id} />
        }
      />
    </div>
  </div>
);



export default withRouter(connect()(App));
