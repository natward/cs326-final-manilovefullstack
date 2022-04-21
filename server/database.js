import fs from "fs"


// Account object structure:
// username: {
//     "pass": ...,
//     "clubs": ...,
//     "friends": ...
// }

function addField(user, pass, fields) {
    const accCheck = checkAccountLogin(user, pass);
    if ("error" in accCheck)
        return accCheck;
    else {
        let dbdata = readDB();

        let accdata = dbdata["accounts"];
        for (const [key, value] of Object.entries(accdata[user])) {
            if (key in accdata[user] && key in fields) {
                if (key != "pass")
                    accdata[user][key].push(fields[key]);
            }
        }
        dbdata["accounts"] = accdata;
        if (!writeDB(dbdata))
                return {"error": "Account update unsuccessful", "statuscode": -6};
    }
    return {};
}

function checkAccountLogin(user, pass) {
    let dbdata = readDB();
    let ret = undefined;

    if (dbdata == undefined)
        ret = {"error": "Database not found", "statuscode": -1};
    else {
        let accdata = dbdata["accounts"];
        if (user in accdata) {
            const curruser = accdata[user];
            if (pass == curruser["pass"]) {
                ret = {}
                for (const [key, value] of Object.entries(accdata[user])) {
                    if (key != "pass")
                        ret[key] = value;
                }
            } else {
                ret = {"error": "Incorrect Password", "statuscode": -2};
            }
        } else {
            ret = {"error": "Username not found", "statuscode": -3};
        }
    }
    return ret;
}

function createNewAccount(user, pass) {
    let dbdata = readDB();
    let ret = undefined;

    if (dbdata == undefined)
        ret = {"error": "Database not found", "statuscode": -1};
    else {
        let accdata = dbdata["accounts"];
        if (user in accdata)
            ret = {"error": "Username already registered", "statuscode": -4}
        else {
            accdata[user] = {
                "pass": pass,
                "clubs": [],
                "friends": []
            };
            dbdata["accounts"] = accdata;
            ret = {};
            if (!writeDB(dbdata))
                return {"error": "Account creation unsuccessful", "statuscode": -5};
        }
    }
    return ret;
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

function getClubInfo(club) {
    let dbdata = readDB();
    if (dbdata == undefined)
        return {"error": "Database not found", "statuscode": -1};

    if (club in dbdata["clubs"])
        return dbdata["clubs"][club]
    else
        return {}
}

function createNewClub(club, fields) {
    let dbdata = readDB();
    let ret = undefined;
    if (dbdata == undefined)
        return {"error": "Database not found", "statuscode": -1};

    let clubdata = dbdata["clubs"];
    if (club in clubdata) {
        ret = {"error": "Club name already in use", "statuscode": -7}
    } else {
        clubdata[club] = {};
        for (const [key, value] of Object.entries(fields)) {
            clubdata[club][key] = value;
        }
        ret = {};
    }
    dbdata["clubs"] = clubdata;
    if (!writeDB(dbdata))
            return {"error": "Club creation unsuccessful", "statuscode": -8};
    return ret;
}

function getClubNames() {
    let dbdata = readDB();
    if (dbdata == undefined)
        return {"error": "Database not found", "statuscode": -1};

    const ret = {"club_names": [], "club_descs": []};
    for (const [club, clubdata] of Object.entries(dbdata["clubs"])) {
        ret["club_names"].push(club);
        ret["club_descs"].push(clubdata["club-description"]);
    }
    return ret;
}

function applyToClub(club, user) {
    let dbdata = readDB();
    if (dbdata == undefined)
        return {"error": "Database not found", "statuscode": -1};

    const cnames = getClubNames()["club_names"].filter(x => x == club);
    if (cnames.length > 0) {
        if (!("club-applications" in dbdata["clubs"][club]))
            dbdata["clubs"][club]["club-applications"] = [];
        
        const capps = dbdata["clubs"][club]["club-applications"].filter(x => x == user);
        if (capps.length == 0)
            dbdata["clubs"][club]["club-applications"].push(user);

        if (!("clubs" in dbdata["accounts"][user]))
            dbdata["accounts"][user]["clubs"] = [];

        const uapps = dbdata["accounts"][user]["clubs"].filter(x => x == club);
        if (uapps.length == 0)
            dbdata["accounts"][user]["clubs"].push(club);

        if (!writeDB(dbdata))
            return {"error": "Write unsuccessful", "statuscode": -10};
    } else {
        return {"error": "Invalid Club Application", "statuscode": -9};
    }

    return {};
}

// Database writing and reading functions

function writeDB(db) {
    fs.writeFileSync('./db.json', JSON.stringify(db), (err) => {
        return false;
    });
    return true;
}

function readDB() {
    let data = undefined;
    data = JSON.parse(fs.readFileSync('./db.json', 'utf8', (err, content) => {
        if (err) {
            return data;
        }
    }));

    if (data == undefined)
        data = {}

    if (!("accounts" in data)) {
        data["accounts"] = {};
    }
    if (!("clubs" in data)){
        data["clubs"] = {};
    }

    return data;
}

export { checkAccountLogin, createNewAccount, addField, createNewClub, getClubInfo, getClubNames, applyToClub };