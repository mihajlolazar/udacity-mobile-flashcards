import React                            from 'react';
import { View }                         from 'react-native';
import { createStore }                  from 'redux';
import { Provider }                     from 'react-redux';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Platform, StatusBar }          from 'react-native';

import DeckList       from './DeckList.js';
import CreateDeck     from './CreateDeck';
import SingleDeck     from './SingleDeck.js';
import CreateQuestion from './CreateQuestion';
import Quiz           from './Quiz.js'

import reducer from '../reducers/index.js';

const Tabs = TabNavigator({
      DeckList: {
        screen: DeckList,
        navigationOptions: {
          tabBarLabel: 'Deck List'
        },
      },
        CreateDeck: {
        screen: CreateDeck,
        navigationOptions: {
          tabBarLabel: 'Create Deck',
        },
      },
    },
    {
      tabBarOptions: {
        style: {
          paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
        }
      },
      navigationOptions: {
        header: null
      },
    }
);

const AppNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {title: 'Home'},
  },
  SingleDeck: {
    screen: SingleDeck,
    navigationOptions: {
      headerTintColor: '#000',
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: '#000',
    },
  },
  CreateQuestion: {
    screen: CreateQuestion,
    navigationOptions: {
      title: 'Add Question',
      headerTintColor: '#000',
    },
  },
});

export default class MobileFlashcards extends React.Component {
  render() {
    return <Provider store={createStore(reducer)}>
      <View style={{flex: 1}}>
        <AppNavigator />
      </View>
    </Provider>
  }
}
