import { Collection, MongoClient } from "mongodb";
// import { client } from "../server";
import db_conn from "../helpers/config/db.config";
import { userAccountInterface } from "../interfaces/userAccountInterface";



class PartyDao {
    // private partyCollection: Collection;

    constructor() {
        // this.partyCollection = client.db(db_conn.DB_NAME).collection(db_conn.PARTY_COLLECTION_NAME);
    }


    public async createAccount(accountDetails: userAccountInterface) {
        // this.partyCollection.insertOne(accountDetails);

    }

}

export default PartyDao;

