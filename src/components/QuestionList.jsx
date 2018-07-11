import React from 'react';
import { connect } from 'react-redux';

import { QuestionListItem, Loading } from './';

const QuestionList = ({ questions }) => (
  <div>
    { questions && questions.length > 0 &&
      <div>
        { questions.map(question =>
          <QuestionListItem
            key={question.question_id}
            {...question}
          />)
        }
      </div>
    }

    { (!questions || !questions.length) &&
      <Loading />
    }
  </div>
);

const mapStateToProps = (state) => ({
  questions: state.questions.items.map(id => ({
    question_id: id,
    ...state.questions.info[id],
  })),
});

export default connect(mapStateToProps)(QuestionList);
