import { router } from 'expo-router';

export class LoginService {
    constructor() {}

    login(username: string, password: string) {
        router.replace('/search');    }

    createAccount(): void {
        console.log('User logged out');
    }
}