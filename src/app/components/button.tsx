import { StyleSheet, View, Pressable, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
  label?: string;
  theme?: string | undefined;
  size_width?: number;
  onPress?: () => void;
};  

export default function Button({ label, theme, size_width, onPress }: Props) {
  if (theme === 'primary') {
    return (
      <View
      style={[
        styles.buttonContainer, 
        { width: size_width },
        ]}>
        <Pressable
          style={[styles.button, { backgroundColor: '#207178' }]}
          onPress={onPress}>
          <Text style={[styles.buttonLabel, { color: '#fff' }]}>{label}</Text>
        </Pressable>
      </View>
    );
  } else if (theme === 'backButton') {
    return (
          <View
      style={[
        stylesBackButton.buttonContainer, 
        { width: size_width },
        ]}>
        <Pressable style={stylesBackButton.button} onPress={onPress}>
          <Ionicons name="arrow-back-outline" size={25} color="white" />
        </Pressable>
      </View>
    );
  } else if (theme === 'secondary') {
    return (
      <View
      style={[
        styles.buttonContainer, 
        { width: size_width },
        ]}>
        <Pressable
          style={[styles.button, { backgroundColor: '#FF9666' }]}
          onPress={onPress}>
          <Text style={[styles.buttonLabel, { color: '#fff' }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.buttonContainer, { width: size_width }]}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={[styles.buttonLabel, {color: '#000'}]}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    padding: 3,
  },
  button: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});

const stylesBackButton = StyleSheet.create({
  buttonContainer:{
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#207178', 
    borderRadius: 40,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  }
  })
