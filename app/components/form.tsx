import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import Button from './button';
import CreateAccountInterface from '../interfaces/createAccountInterface';
import LoginService from '../services/loginService';

function MyForm() {
  const { control, handleSubmit, formState: { errors } } = useForm<CreateAccountInterface>();
  const loginService = new LoginService();

  const onSubmit = (data: CreateAccountInterface) => {
    loginService.createAccount(data);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Firstname"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="firstname"
          rules={{ required: 'Please enter your firstname' }}
        />
        {errors.firstname && <Text style={styles.errorText}>{errors.firstname.message?.toString()}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Lastname"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="lastname"
          rules={{ required: 'Please enter your lastname' }}
        />
        {errors.lastname && <Text style={styles.errorText}>{errors.lastname.message?.toString()}</Text>}

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
            />
          )}
          name="password"
          rules={{ required: 'Please enter a Password', pattern: { value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i, message: "Password must contain at least 8 characters, including UPPER/lowercase and numbers" } }}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password.message?.toString()}</Text>}

        <Button theme="primary" label="Create Account" size_width={150} onPress={handleSubmit(onSubmit)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
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
    marginBottom: 10,
  },
});

export default MyForm;