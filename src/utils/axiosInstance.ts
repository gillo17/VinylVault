import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

// Web Dev URL 'http://localhost:3000';
// Mobile Dev URL 'http://10.0.2.2:3000';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
})

api.interceptors.request.use(
    async (config) => {
        let token
        if (Platform.OS === 'android') {
            token = await getToken('session')
        } else if (Platform.OS === 'web') {
            token = await AsyncStorage.getItem('session')
        }

        if (token) {
            config.headers.Authorization = `${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

async function getToken(key: string) {
    return await SecureStore.getItemAsync(key)
}

export default api
