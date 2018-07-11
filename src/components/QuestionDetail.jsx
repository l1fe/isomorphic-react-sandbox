import React from 'react';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';

import { TagsList, Loading } from './';

const QuestionDetail = ({ title, body, answer_count: answerCount, tags }) => (
  <div>
    <h3>{ title }</h3>
    { body &&
      <div>
        <TagsList />
        <Markdown source={body} />
        <div>
          { answerCount } Answers
        </div>
      </div>
    }
    { !body &&
      <Loading />
    }
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  ...state.questions.items.find(({ question_id }) => question_id == ownProps.question_id),
});

export default connect(mapStateToProps)(QuestionDetail);
