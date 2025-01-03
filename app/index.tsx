import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { Image } from 'expo-image';
import Button from './components/button';
import LoginService from './services/loginService';
import { router } from 'expo-router';
import LoginAccountInterface from './interfaces/loginAccountInterface';
import { useSession } from './utils/ctx';
import { useForm, Controller } from 'react-hook-form';

const VinylVaultLogo = require('../assets/images/VinylVaultLogo.png');

let loginService = new LoginService();

export default function logInScreen() {

  const { control, handleSubmit, formState: { errors } } = useForm<LoginAccountInterface>();

  const { signIn } = useSession();

  const onSubmit = (data: LoginAccountInterface) => {
    loginService.login(data, signIn)
  };
  
  return (
    <View style={styles.container}>
      <Image source={VinylVaultLogo} style={styles.image} />

      <View style={styles.formContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
          rules={{ required: 'Please enter your email', pattern: { value: /^\S+@\S+$/i, message: "Please enter a valid email address" } }}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message?.toString()}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={true}
            />
          )}
          name="password"
          rules={{ required: 'Please enter your lastname' }}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password.message?.toString()}</Text>}

        <View style={styles.buttonContainer}>
          <Button label="Create Account" size_width={125} onPress={() => router.replace('/createAccount')} />
          <Button theme="primary" label="Sign In" size_width={150} onPress={handleSubmit(onSubmit)} />
        </View>

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
  formContainer: {
    paddingTop: 25,
    alignItems: 'center',
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
    paddingTop: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 50,
    width: 300,
    backgroundColor: 'white',
  },
  errorText: {
    color: 'red',
  }
});
