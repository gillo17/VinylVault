import React , {useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import Button from './button';

function MyForm() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

interface FormData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

const onSubmit = (data: FormData) => {
    console.log('Submitted Data:', data);
    setSubmittedData(data);
};

  return (
    <SafeAreaView>
      <View style={styles.container}>
      <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              style={styles.input}
              placeholder="Email"
            />
          )}
          name="email"
          rules={{ required: 'You must enter your email', pattern: { value: /^\S+@\S+$/i, message: 'Enter a valid email address' } }}
        />
        {errors.email && <Text style={styles.errorText}>text</Text>}


        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              style={styles.input}
              placeholder="Password"
            />
          )}
          name="password"
          rules={{ required: 'You must enter a password' }}
        />
        {errors.password && <Text style={styles.errorText}>text</Text>}

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              style={styles.input}
              placeholder="Firstname"
            />
          )}
          name="firstname"
          rules={{ required: 'You must enter your firstname' }}
        />
        {errors.firstname && <Text style={styles.errorText}>text</Text>}

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              style={styles.input}
              placeholder="Lastname"
            />
          )}
          name="lastname"
          rules={{ required: 'You must enter a password' }}
        />
        {errors.lastname && <Text style={styles.errorText}>text</Text>}

        <Button theme="primary" label="Create Account" size_width={300} onPress={() => handleSubmit(onSubmit)} />

        {submittedData && (
          <View>
            <Text>Submitted Data:</Text>
            <Text>First Name: {submittedData.firstname}</Text>
            <Text>Last Name: {submittedData.lastname}</Text>
            <Text>Email: {submittedData.email}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    
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