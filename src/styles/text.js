import { StyleSheet } from 'react-native';
import * as colors    from './colors'

export const text = StyleSheet.create({
  title: {
    textAlign: 'center',
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20
  },
  asLink: {
    color: colors.blue,
    textDecorationLine: 'underline',
    textDecorationColor: colors.blue
  },
  verticalSpacing: {
    marginTop: 15
  }
});