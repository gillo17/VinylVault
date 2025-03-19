import {TextInput, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

type Props = {
    onChangeText?: (text: string) => void;
    text?: string;
    placeholderText?: string;
    width?: number;
  };

const MultilineTextBox = ({onChangeText, text, placeholderText, width }: Props) => {

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={150}
          value={text}
          style={[styles.textInput, {width: width}]}
          onChangeText={onChangeText}
          placeholder={placeholderText}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10
  },
});

export default MultilineTextBox;