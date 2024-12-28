import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

type Props = {
    placeholderText?: string;
    boxWidth?: number;
  };

const textInput = ({ placeholderText, boxWidth }: Props) => {
  const [text, onChangeText] = React.useState('');

  return (
    <View>
        <TextInput
            style={[styles.input, {backgroundColor: '#fff', width: boxWidth}]}
            onChangeText={onChangeText}
            value={text}
            placeholder={placeholderText}
        />
    </View>

  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 50
  },
});

export default textInput;