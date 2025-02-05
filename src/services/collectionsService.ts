import Toast from 'react-native-toast-message';
import { CreateCollectionModel, SubmitImageForTraining, ViewCollectionModel } from '../interfaces/collectionInterfaces';
import api from '../utils/axiosInstance';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

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

    async saveToCollection(collectionID: string) {
        let vinylID: string | null = null;

        if (Platform.OS === 'android') {
            vinylID = await AsyncStorage.getItem('vinylID');
            await AsyncStorage.removeItem('vinylID');
        } else if (Platform.OS === 'web') {
            vinylID = localStorage.getItem('vinylID');
            localStorage.removeItem('vinylID');
        }

        try {

            const req = {
                "collectionID": collectionID,
                "vinylID": vinylID
            }

            const response = await api.post('/collections/saveToCollection', req);

            if (response.status == 200) {
                return response.data;
            } else {
                return 'Error Occurred while saving to collection';
            }
        } catch (error) {
            console.log(error);
        }
    }

    async submitImageForTraining(data: SubmitImageForTraining) {
        try {
            const response = await api.post('/collections/submitImageForTraining', data);

            if (response.status == 201) {
                router.push(`/pages/vinylResultsScreen?artist=${encodeURIComponent(response.data.artist)}&album=${encodeURIComponent(response.data.albumName)}`);
            } else {
                return 'Error Occurred while submitting image for training';
            }
        } catch (error) {
            console.log(error);
        }
    }

    async addVinylToCollection(collectionId: string, albumId: string) {
        try {
            console.log(collectionId);
            console.log(albumId);
            const response = await api.post('/collections/saveVinylToCollection', {
                "collectionID": collectionId,
                "VinylID": albumId
            });

            if (response.status == 201) {
                router.replace(`/pages/collectionInfoPage?collectionId=${encodeURIComponent(collectionId)}`);
            } else {
                console.log(response)
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getCollectionInfo(collectionId: string) {
        try {
            const response = await api.get(`/collections/getCollectionInfo?collectionID=${collectionId}`);

            if (response.status == 200) {
                return response.data;
            } else {
                console.log(response)
            }
        } catch (error) {
            console.log(error);
        }
    }
}
