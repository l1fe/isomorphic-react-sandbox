import Immutable from 'seamless-immutable';

const initialState = Immutable({
  items: [],
});

export const questions = (state = initialState, action) => {
  const questionEquality = (a = {}, b = {}) => a.question_id === b.question_id;

  if (action.type === 'FETCHED_QUESTIONS') {
    const items = action.questions;
    return Immutable(state).merge({
      items,
    });
  }

  return state;
};
