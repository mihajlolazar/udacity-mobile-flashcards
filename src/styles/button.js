import { StyleSheet } from 'react-native';
import * as colors from './colors';

export const button = StyleSheet.create({
  default: {
    marginTop: 15,
    backgroundColor: colors.black,
    borderRadius: 30,
    padding: 15
  },
  defaultText: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.white,
  },
  submit: {
    padding: 15,
    marginTop: 15,
    backgroundColor: colors.blue,
    borderRadius: 30
  },
  submitText: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.white
  },
  correct: {
    padding: 15,
    marginTop: 15,
    backgroundColor: colors.green,
    borderRadius: 10
  },
  correctText: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.white
  },
  incorrect: {
    padding: 15,
    marginTop: 15,
    backgroundColor: colors.red,
    borderRadius: 10
  },
  incorrectText: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.white
  }
});
