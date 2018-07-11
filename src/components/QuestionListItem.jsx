import React from 'react';
import { Link } from 'react-router-dom';

import { TagsList } from './';

const QuestionListItem = ({ question_id, title, tags }) => (
  <div>
    <h3>{title}</h3>
    <TagsList tags={tags} />
    <div>
      <Link to={`/questions/${question_id}`}>
        <button>More info</button>
      </Link>
    </div>
  </div>
);

export default QuestionListItem;
