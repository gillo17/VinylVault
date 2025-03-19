import {StyleSheet, TextInput, View} from 'react-native';

type Props = {
    placeholderText?: string;
    onChangeText?: (text: string) => void;
    text?: string;
    style?: any;
  };

const textInput = ({ placeholderText, style, onChangeText, text }: Props) => {

  return (
    <View style={{flex: 1}}>
        <TextInput
            style={[styles.input, {backgroundColor: '#fff'}, style]}
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
    borderRadius: 50,
    width: '100%',
  },
});

export default textInput;