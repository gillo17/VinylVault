import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Button from './components/button';
import TextBox from './components/textBox';
import LoginService from './services/loginService';
import { router } from 'expo-router';
import LoginAccountInterface from './interfaces/loginAccountInterface';
import { useSession } from './utils/ctx';


const VinylVaultLogo = require('../assets/images/VinylVaultLogo.png');

let loginService = new LoginService();

export default function logInScreen() {

  const { signIn } = useSession();

  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const userData: LoginAccountInterface = {
    email: username,
    password: password,
  }
  
  return (
    <View style={styles.container}>
      <Image source={VinylVaultLogo} style={styles.image} />

      

      <TextBox placeholderText='Username' boxWidth={300} onChangeText={onChangeUsername} text={username} />
      <TextBox placeholderText='Password' boxWidth={300} onChangeText={onChangePassword} text={password} />

      <View style={styles.buttonContainer}>
        <Button label="Create Account" size_width={125} onPress={() => router.replace('/createAccount')} />
        <Button theme="primary" label="Sign In" size_width={150} onPress={() => loginService.login(userData, signIn)} />
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
