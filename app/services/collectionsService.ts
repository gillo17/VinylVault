import axios from 'axios';
import Toast from 'react-native-toast-message';
import { CreateCollectionModel, ViewCollectionModel } from '../interfaces/collectionInterfaces';
import api from '../utils/axiosInstance';
import { router } from 'expo-router';

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
}

