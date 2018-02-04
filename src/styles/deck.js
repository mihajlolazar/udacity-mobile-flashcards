import { StyleSheet } from 'react-native';
import * as colors    from './colors';

export const deck = StyleSheet.create({
  item: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: colors.black,
    borderBottomWidth: 1
  },
  title: {
    textAlign: 'center',
    fontSize: 40
  },
  noCards: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.grey
  }
});
