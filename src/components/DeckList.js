import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, TouchableOpacity, AsyncStorage, Button } from 'react-native';
import { DeckItem } from './DeckItem';

import * as api       from '../utils/api';

import { setDecks }   from '../actions/index';
import { deck }       from '../styles/deck';
import { container }  from '../styles/container';
import { message }    from '../styles/message';
import { text }       from "../styles/text";

class DeckList extends Component {
  state = {
    decks: null,
    decksFetched: false
  };

  componentDidMount() {
    api.getDecks().then(decks => this.props.dispatch(setDecks(decks)))
        .then(() => this.setState(() => ({
            decksFetched: true
          })
        ));
  }

  renderItem = ({item}) => {
      return (
          <View style={deck.item}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('SingleDeck', item)}>
              <DeckItem data={item} />
            </TouchableOpacity>
          </View>
      )
  };

  render(){
    if( !this.state.decksFetched ){
      return (
        <View style={container.default}>
          <Text style={message.notice}>Please wait. Fetching decks</Text>
        </View>
      )
    }
    else {
      if( !Object.keys(this.props.decks).length ){
        return (
          <View style={container.default}>
            <Text style={message.notice}>Sorry, but you don't have any decks at this moment.</Text>
            <Text style={message.notice}>Do you want to <Text onPress={() => (
                this.props.navigation.navigate('CreateDeck')
            )} style={text.asLink}>create one</Text> maybe?</Text>
          </View>
        )
      }
      else {
        return (
          <View>
            <FlatList
                data={Object.values(this.props.decks)}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index}
            />
          </View>
        )
      }
    }
  }
}

function mapStateToProps(state){
  return {
    decks: state
  }
}

export default connect(mapStateToProps)(DeckList);