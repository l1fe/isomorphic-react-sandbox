import { createStore, combineReducers, applyMiddleware } from 'redux';
import { identity } from 'lodash';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { routerReducer as router, routerMiddleware } from 'react-router-redux';

import fetchQuestionsSaga from './sagas/fetch-questions.saga';
import * as reducers from './reducers';

const defaultState = {
};

export default function(history, state = defaultState) {
  const sagaMiddleware = createSagaMiddleware();
  const routerReduxMiddleware = routerMiddleware(history);
  const middlewareChain = [routerReduxMiddleware, sagaMiddleware];

  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger();
    middlewareChain.push(logger);
  }

  const store = createStore(
    combineReducers({
      ...reducers,
      router,
    }),
    state,
    applyMiddleware(...middlewareChain),
  );

  sagaMiddleware.run(fetchQuestionsSaga);

  return store;
};
