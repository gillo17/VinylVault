import { Text, View, StyleSheet } from 'react-native';
import Button from '../components/button';
import { router, useLocalSearchParams } from 'expo-router';

export default function vinylNotFound() {

  const key = useLocalSearchParams<{ key: string }>();
  
  return (
    <View style={styles.rootContainer}>
        <Text style={styles.pageHeading}>We Couldn't Identify Your Vinyl :(</Text>
          <Text style={styles.pageSubHeading}>But we want to be able to next time you get a new vinyl, submit your image to help us train our model better?</Text>

          <View style={styles.buttonContainer}>
              <Button theme="primary" label="Yes" onPress={() => router.push(`/pages/submitImageForTraining?key=${encodeURIComponent(key.key)}`)} size_width={150} />
              <Button theme="primary" label="No" size_width={150} />
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#F2DDCE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageHeading: {
    fontSize: 40,
    fontWeight: 'bold',
    width: '50%',
    textAlign: 'center',
  },
  pageSubHeading: {
    fontSize: 25,
    width: '50%',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingTop: 10,
  }
});
