// account object structure:
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
                ret = {"clubs": curruser["clubs"], "friends": curruser["friends"]};
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
            accdata["accounts"] = {
                user: {
                    "pass": pass,
                    "clubs": [],
                    "friends": []
                }
            };
            dbdata["accounts"] = accdata;
            ret = {};
            if (!writeDB(dbdata))
                return {"error": "Account creation unsuccessful", "code": -5};
        }
    }
    return ret;
}

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
    return data;
}

export { checkAccountLogin, createNewAccount, addField };