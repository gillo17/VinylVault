import React from 'react';
import { Text } from 'react-native';

export const Ionicons = ({ name, size, color }) => {
  return <Text>{`Mocked Ionicon: ${name}, size: ${size}, color: ${color}`}</Text>;
};

export const FontAwesome = Ionicons;
export const MaterialIcons = Ionicons;
export const Entypo = Ionicons;
