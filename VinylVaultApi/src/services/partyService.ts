import PartyDao from "../Daos/partyDao";
import { injectable, inject } from "inversify";
import { userAccountInterface } from "../interfaces/userAccountInterface";

@injectable()
export class PartyService {

    constructor(
        @inject(PartyDao) private partyDao: PartyDao

    ) {}


    public createAccount(accountDetails: userAccountInterface) {

        this.partyDao.createAccount(accountDetails);
        
    }
}
