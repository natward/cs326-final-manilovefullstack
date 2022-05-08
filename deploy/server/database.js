import "dotenv/config"
import { MongoClient, ServerApiVersion } from 'mongodb';

class MongoDatabase {
    constructor() {
      this.uri = process.env.MONGO_DB;
      this.client = undefined;
      this.db = undefined;
    }

    async connect() {
      console.log(this.uri);
      this.client = await MongoClient.connect(this.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
      });
    
      this.db = this.client.db('database');
    }

    close() {
        this.client.close();
    }
}

const DB = new MongoDatabase();
await DB.connect();

// TODO: Refactor this code so that it works with MONGODB: change to querying database

// Account object structure:
// username: {
//     "pass": ...,
//     "clubs": ...,
//     "friends": ...
// }
async function addField(user, pass, fields) {
    const accCheck = await checkAccountLogin(user, pass);
    if ("error" in accCheck)
        return accCheck;

    const database = DB.db;
    const res = await database.collection("accounts").updateOne(
        {"user": user},
        {$set: fields},
        {"upsert": true}
    );
    if(res["matchedCount"] != 1) {
        return {"error": "Fields update unsuccesful", "statuscode": -6}
    } else {
        return {}
    }
}

async function checkAccountLogin(user, pass) {
    const database = DB.db;
    const res = await database.collection("accounts").findOne(
        {"user": user},
        {"pass": 1}
    );

    if(!res) {
        return {"error": "User not found", "statuscode": -3};
    } else {
        if (res["pass"] != pass) {
            return {"error": "Wrong password", "statuscode": -2};
        } else {
            return {};
        }
    }

}

async function createNewAccount(user, pass) {
    const database = DB.db;
    const res = await database.colletion("accounts").insertOne(
        {"user": user, "pass": pass}
    );
    return {};
}


// Club object structure:
// club name: {
//     "event-list": {...},
//     "presidents-name": ...,
//     "club-description": ...,
//     "club-image": ...,
//     "club-video": ...,
//     "club-applications": [...]
// }

// event-list format:
// [
//     {"event": ..., "date": ..., "time": ..., "location": ..., "description": ...}
// ]

async function getClubInfo(club) {
    const database = DB.db;
    const res = await database.collection("clubs").findOne(
        {"club": club},
        {
            "_id": 0,
            "event-list": 1,
            "presidents-name": 1,
            "club-description": 1,
            "club-image": 1,
            "club-video": 1
        }
    );
    if (!res) {
        return {"error": "Club not found", "statuscode": -1}
    } else {
        return res;
    }
}

async function createNewClub(club, fields) {
    const database = DB.db;
    fields["club"] = club;
    const res = await database.collection("clubs").insertOne(
        fields
    );

    return res;
}

async function updateClub(club, fields) {
    const database = DB.db;
    const res = await database.collection("clubs").updateOne(
        {"club": club},
        {$set: fields},
        {"upsert": true}
    );
    if(res["matchedCount"] != 1) {
        return {"error": "Fields update unsuccesful", "statuscode": -11}
    } else {
        return {}
    }
}

async function getClubNames() {
    const database = DB.db;
    const res = await database.collection("clubs").find(
        {},
        {
            "_id": 0, 
            "club": 1
        } 
    );

    if (!res) {
        return {"error": "No clubs found", "statuscode": -12}
    } else {
        return res;
    }
}

async function applyToClub(user, pass, club) {
    const accCheck = await checkAccountLogin(user, pass);
    if ("error" in accCheck)
        return accCheck;
        
    const res = await database.collection("clubs").updateOne(
        {"club": club},
        {$push: {"club-applications": user}},
        {"upsert": true}
    );
}

export { checkAccountLogin, createNewAccount, addField, createNewClub, getClubInfo, getClubNames, applyToClub, updateClub };