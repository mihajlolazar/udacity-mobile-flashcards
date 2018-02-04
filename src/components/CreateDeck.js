import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, Keyboard, Alert } from 'react-native';
import { saveDeckTitle }    from '../utils/api';
import { connect }          from 'react-redux';
import { createDeck }       from '../actions/index';
import { button }           from '../styles/button';
import { input }            from '../styles/input';
import { container }        from '../styles/container';
import { message }          from '../styles/message';
import { text }             from '../styles/text';

class CreateDeck extends Component {
  state = {
    title: '',
    titleDuplicate: '',
    deckSaved: false,
    duplicate: false
  };

  saveDeck = () => {
    const { title } = this.state;

    if( title === '' ){
      Alert.alert(
          'Empty Deck Name',
          'Empty deck name not allowed. Please name your deck.'
      )
    }
    else {
      if( !this.props.decks[title] ){
        saveDeckTitle(title).then(() => {
          this.props.dispatch(createDeck({
            [title]: {
              title: title,
              questions: []
            }
          }))
        }).then(() => {
          this.setState({
            duplicate: false,
            deckSaved: true,
            title: '',
            duplicateTitle: title
          });

          Keyboard.dismiss();
        });
      }
      else {
        this.setState({
          deckSaved: false,
          duplicate: true
        });
      }
    }
  };

  render() {
    return (
      <View style={container.default}>
        <TextInput
            onChangeText={(text) => this.setState({title: text, duplicate: false})}
            value={this.state.title}
            style={input.default}
            placeholder={'What is the title of your new deck ?'}
        />
        <TouchableOpacity onPress={this.saveDeck} style={button.submit}>
          <Text style={button.submitText}>Submit</Text>
        </TouchableOpacity>
        { this.state.duplicate && (
            <Text style={message.error}>Deck with the name "{this.state.title}" already exists. Please use another name</Text>
        )}
        { !this.state.duplicate && this.state.deckSaved && (
            <View>
              <Text style={message.success}>Deck "{this.state.duplicateTitle}" has has been saved!</Text>
              <Text style={text.verticalSpacing}>Do you want to <Text onPress={() => {
                this.props.navigation.navigate('SingleDeck',{title: this.state.duplicateTitle})
              }} style={text.asLink}>see your new deck</Text>?
              </Text>
            </View>
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    decks: state,
  };
}

export default connect(mapStateToProps)(CreateDeck);
