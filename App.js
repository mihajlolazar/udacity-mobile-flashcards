import React                            from 'react';
import { View }                         from 'react-native';
import { createStore }                  from 'redux';
import { Provider }                     from 'react-redux';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Platform, StatusBar }          from 'react-native';

import DeckList       from './src/components/DeckList';
import CreateDeck     from './src/components/CreateDeck';
import SingleDeck     from './src/components/SingleDeck.js';
import CreateQuestion from './src/components/CreateQuestion';
import Quiz           from './src/components/Quiz.js'

import reducer                  from './src/reducers/index.js';
import { setLocalNotification } from './src/utils/notifcation';

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
    navigationOptions: ({ navigation }) => {
      const {state} = navigation;
      return {
        title: `${state.params.title}`,
      };
    }
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

export default class App extends React.Component {
  render() {
    return <Provider store={createStore(reducer)}>
      <View style={{flex: 1}}>
        <AppNavigator />
      </View>
    </Provider>
  }
}