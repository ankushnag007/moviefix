import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import tw from 'twrnc';

const { width, height } = Dimensions.get('window');

export default function loading() {
  return (
    <View style={tw``}>
      <Text>loading</Text>
    </View>
  )
}