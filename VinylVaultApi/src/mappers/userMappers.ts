import mongoose from 'mongoose';
import User, { IUserLogin } from '../models/users';
import { SaltAndHash } from '../utils/saltAndHash';
import { inject, injectable } from 'inversify';
import Types from '../types';

@injectable()
export class UserMappers {

    constructor(
        @inject(Types.SaltAndHash) private saltAndHash: SaltAndHash,
    ) {}

    public mapRequestToUser(req: any) {
        const  { email, password, firstname, lastname } = req.body;

        const [salt, hash, iterations] = this.saltAndHash.hashPassword(password);

        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email,
            firstname,
            lastname,
            Authorisation: {
                salt,
                hash,
                iterations
            }
        })

        return user;
    }

    public mapRequestToUserLogin(req: any): IUserLogin {
        const { email, password } = req.body;

        const user: IUserLogin = {
            email: email,
            password: password
        }

        return user;
    }
}