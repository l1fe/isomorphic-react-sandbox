import { put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

export default [
  takeEvery('REQUEST_FETCH_QUESTION', handleFetchQuestion),
  takeEvery('REQUEST_FETCH_QUESTIONS', handleFetchQuestions),
];

function* handleFetchQuestion({ questionId }) {
  const raw = yield fetch(`/api/questions/${questionId}`);
  const json = yield raw.json();
  const question = json.items[0];
  yield put({ type: 'FETCHED_QUESTION', question });
}

function* handleFetchQuestions({ questionId }) {
  const raw = yield fetch('/api/questions/');
  const json = yield raw.json();
  const questions = json.items;
  yield put({ type: 'FETCHED_QUESTIONS', questions });
}
