import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import MyForm from '../../../src/app/components/form'
import LoginService from '../../../src/services/loginService'

jest.mock('../../../src/services/loginService')

describe('Form Component Tests', () => {
    describe('Input Field Tests', () => {
        it('should render all input fields', () => {
            const { getByPlaceholderText } = render(<MyForm />)
            expect(getByPlaceholderText('Firstname')).toBeTruthy()
            expect(getByPlaceholderText('Lastname')).toBeTruthy()
            expect(getByPlaceholderText('Email')).toBeTruthy()
            expect(getByPlaceholderText('Password')).toBeTruthy()
        })

        it('should show error messages for required fields', async () => {
            const { getByText } = render(<MyForm />)
            fireEvent.press(getByText('Create Account'))

            await waitFor(() => {
                expect(getByText('Please enter your firstname')).toBeTruthy()
                expect(getByText('Please enter your lastname')).toBeTruthy()
                expect(getByText('Please enter your email')).toBeTruthy()
                expect(getByText('Please enter a Password')).toBeTruthy()
            })
        })

        it('should show error message for invalid email', async () => {
            const { getByText, getByPlaceholderText } = render(<MyForm />)
            fireEvent.changeText(getByPlaceholderText('Email'), 'invalid-email')
            fireEvent.press(getByText('Create Account'))

            await waitFor(() => {
                expect(getByText('Please enter a valid email address')).toBeTruthy()
            })
        })

        it('should show error message for invalid password', async () => {
            const { getByText, getByPlaceholderText } = render(<MyForm />)
            fireEvent.changeText(getByPlaceholderText('Password'), 'short')
            fireEvent.press(getByText('Create Account'))

            await waitFor(() => {
                expect(
                    getByText('Password must contain at least 8 characters, including UPPER/lowercase and numbers')
                ).toBeTruthy()
            })
        })

        it('should call createAccount when form is valid', async () => {
            const mockCreateAccount = jest.fn()
            LoginService.prototype.createAccount = mockCreateAccount

            const { getByText, getByPlaceholderText } = render(<MyForm />)
            fireEvent.changeText(getByPlaceholderText('Firstname'), 'John')
            fireEvent.changeText(getByPlaceholderText('Lastname'), 'Doe')
            fireEvent.changeText(getByPlaceholderText('Email'), 'john.doe@example.com')
            fireEvent.changeText(getByPlaceholderText('Password'), 'Password123')
            fireEvent.press(getByText('Create Account'))

            await waitFor(() => {
                expect(mockCreateAccount).toBeCalledWith({
                    firstname: 'John',
                    lastname: 'Doe',
                    email: 'john.doe@example.com',
                    password: 'Password123',
                })
            })
        })
    })
})
