import { Text, View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Button from './components/button';
import TextBox from './components/textBox';
import { LoginService } from './services/loginService';

const VinylVaultLogo = require('../assets/images/VinylVaultLogo.png');

let loginService = new LoginService();

export default function logInScreen() {
  return (
    <View style={styles.container}>
      <Image source={VinylVaultLogo} style={styles.image} />


      <TextBox placeholderText='Username' boxWidth={300}></TextBox>
      <TextBox placeholderText='Password' boxWidth={300}></TextBox>

      <View style={styles.buttonContainer}>
        <Button label="Create Account" size_width={125} onPress={() => loginService.createAccount()} />
        <Button theme="primary" label="Sign In" size_width={150} onPress={() => loginService.login("1", "2")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2DDCE',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 150
  },
  text: {
    color: '#fff',
  },
   image: {
    width: 300,
    height: 350,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
