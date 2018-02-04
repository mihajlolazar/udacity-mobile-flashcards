import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TextInput,TouchableOpacity, Keyboard, Alert } from 'react-native';
import { addQuestion, getDeckQuestions } from '../utils/api';
import * as actions from '../actions/index';
import { container } from '../styles/container';
import { input } from '../styles/input';
import { button } from '../styles/button';
import { message} from '../styles/message';
import { text } from '../styles/text';

class CreateQuestion extends Component {
  state = {
    question: '',
    questionDuplicate: '',
    duplicate: false,
    answer: '',
    saved: false
  };

  submitQuestion = () => {
    const {question, answer} = this.state;
    const {title, questions} = this.props.navigation.state.params;

    const data = {
      title,
      question,
      answer,
      questions
    };

    if( question === '' || answer === '' ){
      Alert.alert(
          'Empty Field',
          'Empty field not allowed. Please check if your question or answer field is empty.'
      )
    }
    else {
      getDeckQuestions(title).then((deckQuestions) => {
        let isDuplicateQuestion = false;

        for( let q in deckQuestions ){
          if( deckQuestions.hasOwnProperty(q) ){
            if( deckQuestions[q].question === question ){
              isDuplicateQuestion = true;
              break;
            }
          }
        }

        if( isDuplicateQuestion ){
          this.setState({
            duplicate: true,
            saved: false
          })
        }
        else {
          addQuestion({
            deckTitle: title,
            data: {
              question,
              answer
            },
          }).then(() => {
            this.props.dispatch(actions.createQuestion(data));

            this.setState({
              saved: true,
              question: '',
              answer: '',
              duplicate: false,
              questionDuplicate: question
            });

            Keyboard.dismiss();

          }).catch(function(error) {
            console.log('error', error);
          });
        }
      });
    }
  };

  render() {
    const {question, answer} = this.state;

    return (
        <View style={container.default}>
          <TextInput
              defaultValue="Question"
              value={question}
              placeholder={'Question'}
              style={input.default}
              onChangeText={question => this.setState({question, duplicate: false})}/>
          <TextInput
              defaultValue="Answer"
              value={answer}
              placeholder={'Answer'}
              style={input.default}
              onChangeText={answer => this.setState({answer, duplicate: false})}/>

          <TouchableOpacity
              onPress={this.submitQuestion}
              style={button.submit}
          >
            <Text style={button.submitText}>Submit</Text>
          </TouchableOpacity>
          {this.state.duplicate && (
              <Text style={message.error}>Question with the name "{this.state.question}" already exists! Please use another name.</Text>
          )}

          {this.state.saved && (
            <View>
              <Text style={message.success}>The question "{this.state.questionDuplicate}" has been successfully saved!</Text>
              <Text style={text.verticalSpacing}>
                <Text onPress={() => (this.props.navigation.goBack())} style={text.asLink}>Go back</Text> to the Deck?</Text>
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

export default connect(mapStateToProps)(CreateQuestion);