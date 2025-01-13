import { router } from 'expo-router';
import CreateAccountInterface from '../interfaces/createAccountInterface';
import Toast from 'react-native-toast-message';
import LoginAccountInterface from '../interfaces/loginAccountInterface';
import api from '../utils/axiosInstance';


export default class LoginService {
  async login(userData: LoginAccountInterface, signIn: (token: string) => void): Promise<void> {   
    try {
      const response = await api.post('/user/accountLogin', userData);

      if (response.status === 200) {
        signIn(response.data.token);
        router.replace('/collections');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error!',
          text2: 'Invalid username or password.',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'An error occurred while logging in.',
      });
    }
  }

  async createAccount(accountInfo: CreateAccountInterface) {
    try {
      const response = await api.post('/user/createUser', accountInfo);
      if (response.status === 201) {
        router.replace('/');
        Toast.show({
          type: 'info',
          text1: 'info!',
          text2: `Account Created!`,
        });
      } else if (response.data.errors) {
        Toast.show({
          type: 'error',
          text1: 'Error!',
          text2: `${response.data.errors}`,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'An error occurred while creating your account.',
      });
    }
  }
}