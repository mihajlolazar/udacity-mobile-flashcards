import { StyleSheet } from 'react-native';
import * as colors from './colors';

export const input = StyleSheet.create({
  default: {
    padding: 15,
    borderWidth: 1,
    fontSize: 16,
    color: colors.black,
    borderColor: colors.black,
    marginBottom: 10
  },
  placeholder: {
    color: colors.placeholder
  }
});
