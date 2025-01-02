import { router } from 'expo-router';
import CreateAccountInterface from '../interfaces/createAccountInterface';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import LoginAccountInterface from '../interfaces/loginAccountInterface';

export default class LoginService {
  async login(userData: LoginAccountInterface, signIn: (token: string) => void): Promise<void> {   
    try {
      const response = await axios.post('http://localhost:3000/user/accountLogin', userData);

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
      const response = await axios.post('http://localhost:3000/user/createUser', accountInfo);
      console.log(response.data);
      if (response.status === 201) {
        router.replace('/');
        return undefined;
      } else if (response.status === 500 && response.data.error === 'A user with this email already exists') {
        Toast.show({
          type: 'error',
          text1: 'Error!',
          text2: 'A user with this email already exists.',
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