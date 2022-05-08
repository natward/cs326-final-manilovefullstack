import { 
    checkAccountLogin, 
    createNewAccount, 
    addField, 
    createNewClub, 
    getClubInfo, 
    getClubNames, 
    applyToClub 
} from "./database.js"
import express from 'express'
import bodyParser from "body-parser"
import logger from 'morgan';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => res.redirect('/index.html'));
app.use('/', express.static('client'));
const port = process.env.PORT;
const url = "https://only-clubs.herokuapp.com/";

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
app.post("/add-fields", async (req, res) => {
    const q = req.body;
    const ret = await addField(q.user, q.pass, q.fields);
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
app.post("/get-fields", async (req, res) => {
    const q = req.body;
    const ret = await checkAccountLogin(q.user, q.pass);
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
app.post("/signin", async (req, res) => {
    const q = req.body;
    const ret = await checkAccountLogin(q.user, q.pass);
    if ("error" in ret)
        res.status(501).json({"error": ret["error"]});
    else
        res.status(200).send(ret);
});

app.post("/apply", async (req, res) => {
    const q = req.body;
    let ret = await checkAccountLogin(q.user, q.pass);
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
app.post("/signup", async (req, res) => {
    const q = req.body;
    const ret = await createNewAccount(q.user, q.pass);
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
app.post("/add-club", async (req, res) => {
    const q = req.body;
    const ret = await createNewClub(q.club, q.fields);
    if ("error" in ret)
        res.status(501).json({"error": ret["error"]});
    else
        res.status(200).json(ret);
});

// On success returns
// either empty obj {}
// or
// full {"event-list: ..., "presidents-name": ..., etc...}
app.get("/get-club", async (req, res) => {
    console.log("hi");
    const q = req.query;
    console.log(q);
    const ret = await getClubInfo(q.club);
    if ("error" in ret)
        res.status(501).json({"error": ret["error"]});
    else {
        if (q.red) {
            let redirurl = new URL(url+"club-page.html");
            redirurl.searchParams.append("club", q.club);
            res.redirect(redirurl.url);
        } else
            res.status(200).json(ret);
    }
});

app.get("/get-events", async (req, res) => {
    const q = req.query;
    const ret = await getClubInfo(q.club);
    if ("error" in ret)
        res.status(501).json({"error": ret["error"]});
    else {
        if (q.red) {
            let red = new URL(url+"calendar.html");
            redirurl.searchParams.append("club", q.club);
            res.redirect(red);
        } else
            res.status(200).json(ret);
    }
});

app.get("/all-clubs", async (req, res) => {
    const q = req.query;
    const ret = await getClubNames();
    if ("error" in ret)
        res.status(501).json({"error": ret["error"]});
    else
        res.status(200).json(ret);
});