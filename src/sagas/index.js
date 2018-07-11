import { all } from 'redux-saga/effects';

import questions from './questions';

export default function* rootSaga() {
  yield all([
    ...questions,
  ]);
}
