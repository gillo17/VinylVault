import { injectable } from "inversify";
import { userAccountInterface } from "../interfaces/userAccountInterface";

@injectable()
export class UserAccountMapper {
    public mapToUserAccount(userAccount: any): userAccountInterface {
        return {
            firstName: userAccount.firstName,
            lastName: userAccount.lastName,
            email: userAccount.email,
            password: userAccount.password
        }
    }
}