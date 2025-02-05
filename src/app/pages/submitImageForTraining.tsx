import { Text, View, StyleSheet, TextInput } from 'react-native';
import Button from '../components/button';
import { Controller, useForm } from 'react-hook-form';
import { SubmitImageForTraining } from '@/src/interfaces/collectionInterfaces';
import { useLocalSearchParams } from 'expo-router';
import CollectionsService from '@/src/services/collectionsService';

export default function vinylNotFound() {

  const { control, handleSubmit, formState: { errors } } = useForm<SubmitImageForTraining>();

  const key = useLocalSearchParams<{ key: string }>();

  const collectionsService = new CollectionsService();
  
  const onSubmit = (data: SubmitImageForTraining) => {
    data.s3Key = key.key

    collectionsService.submitImageForTraining(data);
  };

  return (
    <View style={styles.rootContainer}>
        <Text style={styles.pageHeading}>Thank You!!</Text>
        <Text style={styles.pageSubHeading}>We just need a few details...</Text>

        <View style={styles.formContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Artist Name (e.g. Pink Floyd)"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="Artist"
          rules={{ required: 'Please enter the Artist Name'}}
        />
        {errors.Artist && <Text style={styles.errorText}>{errors.Artist.message?.toString()}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Ablum Name (e.g. Dark Side of the Moon)"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="AlbumName"
          rules={{ required: 'Please enter the Album Name' }}
        />
        {errors.AlbumName && <Text style={styles.errorText}>{errors.AlbumName.message?.toString()}</Text>}

        <View style={styles.buttonContainer}>
          <Button theme="primary" label="Continue" size_width={150} onPress={handleSubmit(onSubmit)} />
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#F2DDCE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pageHeading: {
    fontSize: 40,
    fontWeight: 'bold',
    width: '50%'
  },
  pageSubHeading: {
    fontSize: 25,
    width: '50%'
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  errorText: {
    color: 'red',
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
  formContainer: {
    paddingTop: 25,
    alignItems: 'center',
  }
});
