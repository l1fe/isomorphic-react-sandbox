import React from 'react';

import { TagsList } from './';

const QuestionListItem = ({ title, tags }) => (
  <div>
    <h3>{title}</h3>
    <TagsList tags={tags} />
  </div>
);

export default QuestionListItem;
