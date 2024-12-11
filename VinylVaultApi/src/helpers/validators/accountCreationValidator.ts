import ValidationError from '../customErrorTypes/validationError';
import { userAccountInterface } from '../../interfaces/userAccountInterface';

export class AccountCreationValidator {
    private readonly EMAIL_VALIDATION_ERROR = 'Invalid email address';



    public validateCreateAccountInfo(accountInfo: userAccountInterface) {
        const emailValidation = this.validateEmail(accountInfo.email);

        if (emailValidation) {
            return emailValidation;
        }

        const passwordValidation = this.validatePassword(accountInfo.password);

        if (passwordValidation) {
            return passwordValidation;
        }

        const firstNameValidation = this.validateName(accountInfo.firstName);
        const lastNameValidation = this.validateName(accountInfo.lastName);

        if (firstNameValidation || lastNameValidation) {
            return firstNameValidation || lastNameValidation;
        }

    } 

    private validateEmail(email: string) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return this.EMAIL_VALIDATION_ERROR;
        } else {
            return null;
        }

    }

    private validatePassword(password: string) {
        if (password.length < 8 || password.length > 20) {
            return 'Password must be between 8 and 20 characters long';
        } else {
            return null;
        }
    }

    private validateName(name: string) {
        if (name.length < 2 || name.length > 25) {
            return 'name must be between 2 and 25 characters long';
        } else {
            return null;
        }
    }
}
