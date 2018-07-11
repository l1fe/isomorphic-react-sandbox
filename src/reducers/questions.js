import Immutable from 'seamless-immutable';

const initialState = Immutable({
  items: [],
  info: {},
});

export const questions = (state = initialState, action) => {
  if (action.type === 'FETCHED_QUESTIONS') {
    const items = action.questions;

    return Immutable(state).merge({
      items: [...new Set([...state.items, ...action.questions.map(item => item.question_id)])],
      info: {
        ...state.info,
        ...(items.reduce((total, val) => ({ ...total, [val.question_id]: val }), { })),
      },
    });
  }

  if (action.type === 'FETCHED_QUESTION') {
    const item = action.question;
    return Immutable(state).merge({
      items: [...new Set([...state.items, item.question_id])],
      info: {
        ...state.info,
        [item.question_id]: {
          ...(state.info[item.question_id] || {}),
          ...item,
        },
      },
    });
  }

  return state;
};
