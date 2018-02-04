import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View,TouchableOpacity } from 'react-native';
import { DeckItem }     from './DeckItem';
import { container }    from '../styles/container';
import { button }       from '../styles/button';

class SingleDeck extends Component {
  render(){
    let { title } = this.props.navigation.state.params;
    let { decks } = this.props;

    const questions = (title && decks) ? decks[title].questions : [];
    return(
      <View style={container.default}>
        <DeckItem data={{
          title,
          questions
        }} />

        <TouchableOpacity
            onPress={() => {this.props.navigation.navigate('CreateQuestion',{title,questions,})}}
            style={button.default}
        >
          <Text style={button.defaultText}>Add new Card</Text>
        </TouchableOpacity>
        <View>
          {!!questions.length && (
              <TouchableOpacity
                  onPress={() => {this.props.navigation.navigate('Quiz',{title,questions,})}}
                  style={button.submit}
              >
                <Text style={button.submitText}>Start Quiz</Text>
              </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    decks: state,
  };
}

export default connect(mapStateToProps)(SingleDeck);