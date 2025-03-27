import CreateAccountInterface from '../../src/interfaces/createAccountInterface'
import LoginAccountInterface from '../../src/interfaces/loginAccountInterface'

class LoginHelper {
    public generateLoginData() {
        const mockData: LoginAccountInterface = {
            email: 'testuser',
            password: 'password',
        }

        return mockData
    }

    public generateCreateAccountData() {
        const mockData: CreateAccountInterface = {
            firstname: 'testuser',
            lastname: 'testuser',
            password: 'password',
            email: 'test@example.com',
        }

        return mockData
    }
}

export default LoginHelper
