import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { roundTo }    from '../utils/helpers';
import { text }       from '../styles/text';
import { container }  from '../styles/container';
import { heading }    from '../styles/heading';
import { message }    from '../styles/message';
import { button }     from '../styles/button';
import { quiz }       from '../styles/quiz';

export default class Quiz extends Component {
  state = {
    index: 0,
    score: 0,
    showAnswer: false
  };

  showAnswer(){
    this.setState({
      showAnswer: true
    })
  }

  hideAnswer(){
    this.setState({
      showAnswer: false
    })
  }

  correctAnswer = () => {
    const { score, index } = this.state;

    this.setState({
      score: score + 1,
      index: index + 1,
      showAnswer: false
    })
  };

  wrongAnswer = () => {
    this.setState({
      index: this.state.index + 1,
      showAnswer: false
    })
  };

  render(){
    const { title }     = this.props.navigation.state.params;
    const { questions } = this.props.navigation.state.params;
    const question      = questions[this.state.index];

    if( (this.state.index + 1) > questions.length ){
      return (
        <View style={container.default}>
          <Text style={quiz.finishText}>Congrats, you finished this Quiz.</Text>
          <Text style={quiz.finishText}>Your score: {roundTo(((this.state.score/questions.length)*100),2)}%</Text>
          <TouchableOpacity
              onPress={() => { this.props.navigation.goBack(); }}
              style={button.default}>
            <Text style={button.defaultText}>Go back to the Deck</Text>
          </TouchableOpacity>
        </View>
      )
    }
    else {
      return (
        <View style={container.default}>
          <Text style={[text.title, heading.h3]}>{title} - Question {this.state.index+1} of {questions.length}</Text>
          <View>
            <Text style={quiz.questionTitle}>{question.question}</Text>
            <Text onPress={() => {this.state.showAnswer ? this.hideAnswer() : this.showAnswer();}}
                  style={[message.error,quiz.questionAnswer]}>{this.state.showAnswer ? 'Hide Answer' : 'Show Answer'}</Text>

            {this.state.showAnswer && (
                <Text style={quiz.questionTitle}>{question.answer}</Text>
            )}
          </View>
          <View>
            <TouchableOpacity onPress={this.correctAnswer} style={button.correct}>
              <Text style={button.correctText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.wrongAnswer} style={button.incorrect}>
              <Text style={button.incorrectText}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
}