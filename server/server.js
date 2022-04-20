import { checkAccountLogin, createNewAccount, addField, createNewClub, getClubInfo, getClubNames, applyToClub } from "./database.js"
import express from 'express'
import bodyParser from "body-parser"
import cors from "cors"

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 5050;
const url = "http://milfs.com/"

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// USER CONTENT //

// Account object structure:
// user: {
//     "pass": ...,
//     "clubs": ...,
//     "friends": ...
// }

//             //

// post request body format (only one club and one friend):
// {
//     "clubs": ...,
//     "friends": ...
// }
app.post("/add-fields", (req, res) => {
    const q = req.body;
    const ret = addField(q.user, q.pass, q.fields);
    if ("error" in ret)
        res.status(501).json({"error": ret["error"]});
    else
        res.status(200).send(ret);
});

// Post request body format:
// {
//     "user": ...,
//     "pass": ...
// }
app.post("/get-fields", (req, res) => {
    const q = req.body;
    const ret = checkAccountLogin(q.user, q.pass);
    if ("error" in ret)
        res.status(501).json({"error": ret["error"]});
    else
        res.status(200).json(ret);
});

// https://stackoverflow.com/questions/54048193/read-value-from-json-file-using-node-js
// Post request body format:
// {
//     "user": ...,
//     "pass": ...
// }
app.post("/signin", (req, res) => {
    const q = req.body;
    const ret = checkAccountLogin(q.user, q.pass);
    if ("error" in ret)
        res.status(501).json({"error": ret["error"]});
    else
        res.status(200).send(ret);
});

app.post("/apply", (req, res) => {
    const q = req.body;
    let ret = checkAccountLogin(q.user, q.pass);
    if ("error" in ret)
        res.status(501).json({"error": ret["error"]});
    else {
        ret = applyToClub(q.club, q.user);
        if ("error" in ret)
            res.status(501).json({"error": ret["error"]});
        else
            res.status(200).send(ret);
    }
});

// Post request body format:
// {
//     "user": ...,
//     "pass": ...
// }
app.post("/signup", (req, res) => {
    const q = req.body;
    const ret = createNewAccount(q.user, q.pass);
    if ("error" in ret)
        res.status(501).json({"error": ret["error"]});
    else
        res.status(200).json(ret);
});

// CLUB CONTENT //

// Club object structure:
// club_name: {
//     "event-list": ...,
//     "presidents-name": ...,
//     "club-image": ..., // in base-64
//     ""
// }


// Post request body format:
// {
//     "club": ...,
//     "fields": {
//         "event-list": ...,
//         "presidents-name": ...,
//         "club-image": ...
//     }
// }
app.post("/add-club", (req, res) => {
    const q = req.body;
    const ret = createNewClub(q.club, q.fields);
    if ("error" in ret)
        res.status(501).json({"error": ret["error"]});
    else
        res.status(200).json(ret);
});

// On success returns
// either empty obj {}
// or
// full {"event-list: ..., "presidents-name": ..., etc...}
app.get("/get-club", (req, res) => {
    const q = req.query;
    const ret = getClubInfo(q.club);
    if ("error" in ret)
        res.status(501).json({"error": ret["error"]});
    else {
        if (q.redirect) {
            let redirurl = new URL(url+"calendar.html");
            redirurl.searchParams.append("club", q.club);
            res.redirect(redirurl.url);
        } else
            res.status(200).json(ret);
    }
});

app.get("/all-clubs", (req, res) => {
    const q = req.query;
    const ret = getClubNames();
    if ("error" in ret)
        res.status(501).json({"error": ret["error"]});
    else
        res.status(200).json(ret);
});