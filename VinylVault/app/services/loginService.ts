import { router } from 'expo-router';

export default class LoginService {
    constructor() {}

    login(username: string, password: string) {
        router.replace('/search');    }

    createAccount(): void {
        router.replace('/createAccount');
    }
}