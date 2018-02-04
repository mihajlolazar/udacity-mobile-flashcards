import React from 'react';
import { View, Text } from 'react-native';
import { deck } from '../styles/deck';

export const DeckItem = ({data}) => {
  return (
      <View>
        <Text style={deck.title}>{data.title}</Text>
        <Text style={deck.noCards}>{data.questions.length} Deck{data.questions.length > 1 ? 's' : ''}</Text>
      </View>
  )
};