import Toast from 'react-native-toast-message';
import { CreateCollectionModel, ViewCollectionModel } from '../interfaces/collectionInterfaces';
import api from '../utils/axiosInstance';
import { router } from 'expo-router';
import { CameraCapturedPicture } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';

export default class CollectionsService {

    async getCollections() {

        try {
            const response = await api.get('/collections/getCollections');
            return response.data as ViewCollectionModel[];
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: 'Error Fetching Collections',
            });
        }
    }

    async createCollection(data: CreateCollectionModel) {
        try {
            const response = await api.post('/collections/createCollection', data);

            if (response.status == 201) {
                Toast.show({
                    type: 'info',
                    text1: 'Info!',
                    text2: 'Collection Created!',
                });
                router.replace('/collections')
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: 'Error Creating Collection - This name may already exist',
            });
        }
    }

    async identifyVinyl(photo: CameraCapturedPicture) {

        const photo64 = await FileSystem.readAsStringAsync(photo.uri, { encoding: FileSystem.EncodingType.Base64 });
        
        const buffer = Buffer.from(photo64, 'base64');


        const formData = new FormData();

        console.log(buffer)

        const blob = new Blob([photo64]);

        formData.append('file', blob);

        try {
            const response = await api.post('/collections/identifyVinyl', {formData});

            if (response.status == 200) {
                
            }
        } catch (error) {
            console.log(error);
        }
    }
}
