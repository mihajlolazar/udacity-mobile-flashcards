import { AsyncStorage } from 'react-native'

export const ASYNC_STORAGE_DECK_KEY = 'ASYNC_STORAGE_DECK_KEY';

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(ASYNC_STORAGE_DECK_KEY, JSON.stringify({
    [title]: {
      title: title,
      questions: []
    }
  }))
}

export function getDecks() {
  return AsyncStorage.getItem(ASYNC_STORAGE_DECK_KEY).then(results => {
    return JSON.parse(results)
  });
}

export function addQuestion({deckTitle, data}) {
  return AsyncStorage.getItem(ASYNC_STORAGE_DECK_KEY).then((results) => {
    let decks = JSON.parse(results);

    let questions = decks[deckTitle].questions;
    questions.push(data);

    return JSON.stringify({
      [deckTitle]: {
        title: deckTitle,
        questions: questions
      },
    });
  }).then((data) => {
    return AsyncStorage.mergeItem(ASYNC_STORAGE_DECK_KEY, data);
  });
}

export function getDeckQuestions(deckTitle) {
  return AsyncStorage.getItem(ASYNC_STORAGE_DECK_KEY).then((results) => {
    let decks = JSON.parse(results);

    return decks[deckTitle].questions;
  })
}