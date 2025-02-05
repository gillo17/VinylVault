import { Text, View, StyleSheet, Button } from 'react-native';
import { useRef, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable } from 'react-native';
import { CameraView, CameraCapturedPicture, useCameraPermissions } from 'expo-camera';
import CollectionsService from '../../services/collectionsService';
import * as ImagePicker from 'expo-image-picker';
import VinylService from '@/src/services/vinylService';

export default function scanScreen() {

  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);

  const vinylService = new VinylService();
  
  const cameraRef = useRef<CameraView>(null);
  
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0, base64: true });
      if (photo) {
        setPhoto(photo);
        await vinylService.identifyVinyl(photo);
      } 
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef}>
        <View style={styles.captureButtonContainer}>
          <Pressable style={styles.captureButton} onPress={takePicture}>
            <Ionicons name="square-outline" size={40} color="white" />
          </Pressable>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2DDCE',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  button: {
    backgroundColor: '#207178',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: 'white',
  },
  captureButtonContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  captureButton: {
    backgroundColor: '#207178',
    padding: 20,
    borderRadius: 50,
  },
  uploadButton: {
    backgroundColor: '#207178',
    padding: 20,
    borderRadius: 50,
  },
  message: {
    color: 'red',
    fontSize: 20
  }
});
