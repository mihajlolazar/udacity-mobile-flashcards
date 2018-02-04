import * as types from '../actions/types';

function reducerDecks(state = {}, action) {
  switch (action.type) {
    case types.SET_DECKS:
      return {...state, ...action.decks};

    case types.DECK_ADD:
      return {
        ...state,
        ...action.deck
      };

    case types.QUESTION_ADD:
      const { title, question, answer, questions } = action.data;

      return {
        ...state,
        [title]: {...state[title], questions: questions.concat([{
          question,
          answer }]
        )},
      };

    default:
      return state;
  }
}

export default reducerDecks;
