import { checkAccountLogin, createNewAccount, addField } from "./database.js"
import express from 'express'
const app = express()
const port = 5050

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// update format (only one club and one friend):
// {
//     "clubs": ...,
//     "friends": ...
// }
app.post("/club-page", (req, res) => {
    const q = req.query;
    const ret = addField(q.user, q.pass, q.update);
    if ("error" in ret)
        res.status(ret["code"]).json({"error": ret["error"]});
    else
        res.status(200).send(ret);
});

// https://stackoverflow.com/questions/54048193/read-value-from-json-file-using-node-js
app.post("/signin", (req, res) => {
    const q = req.query;
    const ret = checkAccountLogin(q.user, q.pass);
    if ("error" in ret)
        res.status(ret["code"]).json({"error": ret["error"]});
    else
        res.status(200).send(ret);
});

app.post("/signup", (req, res) => {
    const q = req.query;
    const ret = createNewAccount(q.user, q.pass);
    if ("error" in ret)
        res.status(ret["code"]).json({"error": ret["error"]});
    else
        res.status(200).json(ret);
});