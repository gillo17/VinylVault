import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

interface MultilineTextBoxProps {
  placeholderText?: string;
  text?: string;
  onChangeText?: (text: string) => void;
  width?: number;
}

const MultilineTextBox: React.FC<MultilineTextBoxProps> = ({ placeholderText, text, onChangeText, width }) => {
  return (
    <View style={[styles.container, { width }]} testID="multiline-textbox">
      <TextInput
        style={styles.textInput}
        placeholder={placeholderText}
        multiline
        value={text}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  textInput: {
    height: 100,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default MultilineTextBox;