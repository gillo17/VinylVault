import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import CollectionsService from '../services/collectionsService';
import { CreateCollectionModel } from '../interfaces/collectionInterfaces';
import Button from '../components/button';
import MultilineTextBox from '../components/multiLineTextBox';
import Toast from 'react-native-toast-message';

export default function CreateCollectionScreen() {

  const { control, handleSubmit, formState: { errors } } = useForm<CreateCollectionModel>();

  const collectionsService = new CollectionsService();

  const onSubmit = (data: CreateCollectionModel) => {
    collectionsService.createCollection(data)
  };
  
  return (
    <View style={styles.container}>
      <Toast />
        <Text style={styles.heading}> Create Collection </Text>

        <View style={styles.formContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Collection Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="collectionName"
            rules={{ required: 'Please enter a Collection Name' }}
          />
          {errors.collectionName && <Text style={styles.errorText}>{errors.collectionName.message?.toString()}</Text>}

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <MultilineTextBox placeholderText='Description...' onChangeText={onChange} text={value} width={300}></MultilineTextBox>
            )}
            name="description"

          />
        </View>

        <Button theme="primary" label="Create Collection" size_width={150} onPress={handleSubmit(onSubmit)} />
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  errorText: {
    color: 'red',
    paddingBottom: 10
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 50,
    width: 300,
    backgroundColor: 'white',
    paddingBottom: 10
  },
  formContainer: {
    paddingTop: 25,
    alignItems: 'center',
    paddingBottom: 25
  },
});
