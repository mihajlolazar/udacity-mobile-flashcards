import { StyleSheet } from 'react-native';
import * as colors from './colors';

export const quiz  = StyleSheet.create({
  questionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center'
  },
  questionAnswer: {
    textAlign: 'center',
    marginBottom: 15
  },
  finishText: {
    fontSize: 20,
    color: colors.black
  }
});