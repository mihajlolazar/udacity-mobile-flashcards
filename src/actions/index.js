import * as types from './types';

export function setDecks(decks){
  return {
    type: types.SET_DECKS,
    decks
  }
}

export function createDeck(deck){
  return {
    type: types.DECK_ADD,
    deck
  }
}

export function createQuestion(data){
  return {
    type: types.QUESTION_ADD,
    data
  }
}