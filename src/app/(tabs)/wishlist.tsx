import { Text, View, StyleSheet } from 'react-native';

export default function wishlistScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Wishlist</Text>
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
