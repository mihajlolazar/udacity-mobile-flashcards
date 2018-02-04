import { StyleSheet } from 'react-native';
import * as colors    from './colors'

export const message = StyleSheet.create({
  success: {
    fontSize: 16,
    marginTop: 15,
    color: colors.green
  },
  error: {
    fontSize: 16,
    marginTop: 15,
    color: colors.red
  },
  warning: {
    fontSize: 16,
    marginTop: 15,
    color: colors.yellow
  },
  notice: {
    fontSize: 16,
    marginTop: 15,
    color: colors.grey
  }
});