import { Text, View, StyleSheet } from 'react-native';

export default function searchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Vinyl Search</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2DDCE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
