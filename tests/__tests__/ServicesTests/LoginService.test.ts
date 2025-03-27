import Toast from 'react-native-toast-message'
import api from '../../../src/utils/axiosInstance'
import LoginService from '../../../src/services/loginService'
import { router } from 'expo-router'
import LoginHelper from '../../TestHelpers/LoginHelper'
import ResponseHelper from '../../TestHelpers/ResponseHelper'

describe('LoginService Tests', () => {
    const loginService = new LoginService()
    const loginHelper = new LoginHelper()
    const apiResponseHelper = new ResponseHelper()

    describe('Login Tests', () => {
        it('should show an error toast when login fails', async () => {
            const mockUserData = loginHelper.generateLoginData()
            const mockSignIn = jest.fn()

            jest.spyOn(api, 'post').mockRejectedValue(new Error('Error Logging In'))
            jest.spyOn(Toast, 'show')

            await loginService.login(mockUserData, mockSignIn)

            expect(Toast.show).toBeCalledWith({
                type: 'error',
                text1: 'Error!',
                text2: 'An error occurred while logging in.',
            })
        })

        it('should navigate to collections page when login succeeds', async () => {
            const mockUserData = loginHelper.generateLoginData()
            const mockSignIn = jest.fn()
            const mockResponse = {
                data: { token: 'test-token' },
                status: 200,
            }

            jest.spyOn(api, 'post').mockResolvedValue(mockResponse)
            jest.spyOn(router, 'replace')

            await loginService.login(mockUserData, mockSignIn)

            expect(mockSignIn).toBeCalledWith('test-token')
            expect(router.replace).toBeCalledWith('/collections')
        })

        it('should show an error toast when login credentials are invalid', async () => {
            const mockUserData = loginHelper.generateLoginData()
            const mockSignIn = jest.fn()
            const mockResponse = {
                status: 401,
            }

            jest.spyOn(api, 'post').mockResolvedValue(mockResponse)
            jest.spyOn(Toast, 'show')

            await loginService.login(mockUserData, mockSignIn)

            expect(Toast.show).toBeCalledWith({
                type: 'error',
                text1: 'Error!',
                text2: 'Invalid username or password.',
            })
        })
    })

    describe('Create Account Tests', () => {
        it('should show an error toast when creating account fails', async () => {
            const mockAccountInfo = loginHelper.generateCreateAccountData()

            jest.spyOn(api, 'post').mockRejectedValue(new Error('Error Creating Account'))
            jest.spyOn(Toast, 'show')

            await loginService.createAccount(mockAccountInfo)

            expect(Toast.show).toBeCalledWith({
                type: 'error',
                text1: 'Error!',
                text2: 'An error occurred while creating your account.',
            })
        })

        it('should navigate to home page when account creation succeeds', async () => {
            const mockAccountInfo = loginHelper.generateCreateAccountData()
            const mockResponse = apiResponseHelper.successfulAPIResponse()

            jest.spyOn(api, 'post').mockResolvedValue(mockResponse)
            jest.spyOn(router, 'replace')
            jest.spyOn(Toast, 'show')

            await loginService.createAccount(mockAccountInfo)

            expect(router.replace).toBeCalledWith('/')
            expect(Toast.show).toBeCalledWith({
                type: 'info',
                text1: 'info!',
                text2: 'Account Created!',
            })
        })

        it('should show an error toast when account creation has validation errors', async () => {
            const mockAccountInfo = loginHelper.generateCreateAccountData()
            const mockResponse = {
                data: { errors: 'Username already exists' },
                status: 400,
            }

            jest.spyOn(api, 'post').mockResolvedValue(mockResponse)
            jest.spyOn(Toast, 'show')

            await loginService.createAccount(mockAccountInfo)

            expect(Toast.show).toBeCalledWith({
                type: 'error',
                text1: 'Error!',
                text2: 'Username already exists',
            })
        })
    })
})
