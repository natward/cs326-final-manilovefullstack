// Account object structure:
// "user": {
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
            if (key in accdata[user] && key in fields)
                accdata[user][key].append(value);
        }
        dbdata["accounts"] = accdata;
        if (!writeDB(dbdata))
                return {"error": "Account update unsuccessful", "code": -6};
    }
    return {};
}

function checkAccountLogin(user, pass) {
    let dbdata = readDB();
    let ret = undefined;

    if (dbdata == undefined)
        ret = {"error": "Database not found", "code": -1};
    else {
        let dbdata = dbdata["accounts"];
        if (user in dbdata) {
            const curruser = dbdata[user];
            if (pass == curruser["pass"]) {
                ret = {}
                for (const [key, value] of Object.entries(accdata[user])) {
                    if (key != "pass")
                        ret[key] = value;
                }
            } else {
                ret = {"error": "Incorrect Password", "code": -2};
            }
        } else {
            ret = {"error": "Username not found", "code": -3};
        }
    }
    return ret;
}

function createNewAccount(user, pass) {
    let dbdata = readDB();
    let ret = undefined;

    if (dbdata == undefined)
        ret = {"error": "Database not found", "code": -1};
    else {
        let accdata = dbdata["accounts"];
        if (user in accdata)
            ret = {"error": "Username already registered", "code": -4}
        else {
            accdata[user] = {
                "pass": pass,
                "clubs": [],
                "friends": []
            };
            dbdata["accounts"] = accdata;
            ret = {};
            if (!writeDB(dbdata))
                return {"error": "Account creation unsuccessful", "code": -5};
        }
    }
    return ret;
}


// Club object structure:
// "club_name": {
//     "event-list": ...,
//     "presidents-name": ...,
//     "club-image": ..., // in base-64
// }

function getClubInfo(club) {
    let dbdata = readDB();
    if (dbdata == undefined)
        return {"error": "Database not found", "code": -1};

    if (club in dbdata["clubs"])
        return dbdata["clubs"][club]
    else
        return {}
}

function createNewClub(club, fields) {
    let dbdata = readDB();
    if (dbdata == undefined)
        return {"error": "Database not found", "code": -1};

    let clubdata = dbdata["clubs"];
    if (club in clubdata) {
        ret = {"error": "Club name already in use", "code": -7}
    } else {
        clubdata[user] = {};
        for (const [key, value] of Object.entries(fields)) {
            clubdata[user][key].append(value);
        }
        ret = {};
    }
    dbdata["clubs"] = clubdata;
    if (!writeDB(dbdata))
            return {"error": "Club creation unsuccessful", "code": -8};
    return ret;
}

// Database writing and reading functions

function writeDB(db) {
    fs.writeFileSync('./db.json', JSON.stringify(db), (err) => {
        return false;
    });
    return true;
}

function readDB() {
    const data = undefined;
    fs.readFileSync('./db.json', 'utf8', (err, content) => {
        if (err) {
            return data;
        } else {
            data = JSON.parse(content);
        }
    });

    if (!("accounts" in data)) {
        data["accounts"] = {};
    } else if (!("clubs" in data)){
        data["clubs"] = {};
    }

    return data;
}

export { checkAccountLogin, createNewAccount, addField, createNewClub, getClubInfo };