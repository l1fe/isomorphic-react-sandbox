import express from 'express';
import yields from 'express-yields';
import fs from 'fs-extra';
import webpack from 'webpack';
import { argv } from 'optimist';
import { get } from 'request-promise';
import { delay } from 'redux-saga';

import { question, questions } from '../data/api-real-url';

// Server side rendering
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import getStore from '../src/getStore';
import App from '../src/App';

const port = process.env.PORT || 3000;
const app = express();

const useLiveData = argv.useLiveData === 'true';
const useServerRender = argv.useServerRender === 'true';

function* getQuestions() {
  let data;
  if (useLiveData) {
    data = yield get(questions, { gzip: true });
  } else {
    data = yield fs.readFile('data/mock-data.json', 'utf-8');
  }

  return JSON.parse(data);
}

function* getQuestion(questionId) {
  let data;
  if (useLiveData) {
    data = yield get(question(questionId), { gzip: true, json: true });
  } else {
    const questions = yield getQuestions();
    const question = questions.items.find(_question => _question.question_id == questionId);
    question.body = `Mock question body: ${questionId}`;
    data = {items: [question]};
  }

  return data;
}

app.get(['/api/questions'], function* (req,res) {
  const data = yield getQuestions();
  yield delay(150);
  return res.json(data);
});

app.get(['/api/questions/:id'], function* (req,res) {
  const data = yield getQuestion(req.params.id);
  yield delay(150);
  return res.json(data);
});

if (process.env.NODE_ENV === 'development') {
  const config = require('../webpack.config.dev.babel').default;
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.get(['/'], function* (req,res) {
  let index = yield fs.readFile('public/index.html', 'utf-8');

  const initialState = { questions: { items: [] } };

  const items = yield getQuestions();
  initialState.questions.items = items;

  const store = getStore(initialState);

  if (useServerRender) {
    const appRendered = renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    );
    index = index.replace('<%= preloadedApplication %>', appRendered);
  } else {
    index = index.replace('<%= preloadedApplication %>', 'Please wait while we load the application');
  }

  return res.send(index);
});

app.listen(port, '0.0.0.0', () => console.info(`ExpressJS is listening on port ${port}`));
