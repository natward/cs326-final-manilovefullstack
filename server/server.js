import { checkAccountLogin, createNewAccount, addField, createNewClub, getClubInfo } from "./database.js"
import express from 'express'
import bodyParser from "body-parser"

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 5050;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// USER CONTENT //

// Account object structure:
// "user": {
//     "pass": ...,
//     "clubs": ...,
//     "friends": ...
// }

//             //

// update format (only one club and one friend):
// {
//     "clubs": ...,
//     "friends": ...
// }
app.post("/add-field", (req, res) => {
    const q = req.body;
    const ret = addField(q.user, q.pass, q.fields);
    if ("error" in ret)
        res.status(ret["code"]).json({"error": ret["error"]});
    else
        res.status(200).send(ret);
});

app.post("/get-fields", (req, res) => {
    const q = req.body;
    const ret = checkAccountLogin(q.user, q.pass);
    if ("error" in ret)
        res.status(ret["code"]).json({"error": ret["error"]});
    else
        res.status(200).json(ret);
});

// https://stackoverflow.com/questions/54048193/read-value-from-json-file-using-node-js
app.post("/signin", (req, res) => {
    const q = req.body;
    const ret = checkAccountLogin(q.user, q.pass);
    if ("error" in ret)
        res.status(ret["code"]).json({"error": ret["error"]});
    else
        res.status(200).send(ret);
});

app.post("/signup", (req, res) => {
    const q = req.body;
    const ret = createNewAccount(q.user, q.pass);
    if ("error" in ret)
        res.status(ret["code"]).json({"error": ret["error"]});
    else
        res.status(200).json(ret);
});

// CLUB CONTENT //

// Club object structure:
// "club_name": {
//     "event-list": ...,
//     "presidents-name": ...,
//     "club-image": ..., // in base-64
//     ""
// }

app.post("/add-club", (req, res) => {
    const q = req.body;
    const ret = createNewClub(q.club, q.fields);
    if ("error" in ret)
        res.status(ret["code"]).json({"error": ret["error"]});
    else
        res.status(200).json(ret);
});

// On success returns
// either empty obj ({})
// or
// full ({"event-list: ..., "presidents-name": ..., etc...})
app.post("/get-club", (req, res) => {
    const q = req.body;
    const ret = getClubInfo(q.club);
    if ("error" in ret)
        res.status(ret["code"]).json({"error": ret["error"]});
    else
        res.status(200).json(ret);
});