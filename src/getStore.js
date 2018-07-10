import { createStore, combineReducers, applyMiddleware } from 'redux';
import { identity } from 'lodash';

const initialState = {
  test: 'Test Value',
};

export default function(state = initialState) {
  const store = createStore(identity, state);
  return store;
};
