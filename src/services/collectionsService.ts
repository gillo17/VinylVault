import Toast from 'react-native-toast-message';
import { CollectionInfoInterface, CreateCollectionModel, SubmitImageForTraining, ViewCollectionModel } from '../interfaces/collectionInterfaces';
import api from '../utils/axiosInstance';
import { router } from 'expo-router';

export default class CollectionsService {

    async getCollections() {

        try {
            const response = await api.get('/collections/getCollections');
            return response.data;
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

    async submitImageForTraining(data: SubmitImageForTraining) {
        try {
            const response = await api.post('/collections/submitImageForTraining', data);

            if (response.status == 201) {
                router.push(`/pages/vinylResultsScreen?artist=${encodeURIComponent(response.data.artist)}&album=${encodeURIComponent(response.data.albumName)}`);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error!',
                    text2: 'Error Occurred while submitting image for training',
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: 'Error Occurred while submitting image for training',
            });
        }
    }

    async addVinylToCollection(collectionId: string, albumId: string) {
        try {
            const response = await api.post('/collections/saveVinylToCollection', {
                "collectionID": collectionId,
                "VinylID": albumId
            });
            if (response.status == 201) {
                router.replace(`/pages/collectionInfoPage?collectionId=${encodeURIComponent(collectionId)}`);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error!',
                    text2: 'Error Occurred while adding vinyl to collection',
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: 'Error Occurred while adding vinyl to collection',
            });
        }
    }

    async getCollectionInfo(collectionId: string) {
        try {
            const response = await api.get(`/collections/getCollectionInfo?collectionID=${collectionId}`);

            if (response.status == 200) {
                return response.data;
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error!',
                    text2: 'Error Occurred while fetching collection info'
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: 'Error Occurred while fetching collection info'
            });
        }
    }
}
