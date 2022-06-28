import express from "express";
import cors from "cors";

import { Users } from "./users.js";

const app = express();
const port = 5000;


app.use(cors());

app.get("/", (req, res) => {
    const { q } = req.query;

    const keys = ["first_name", "last_name", "email"];

    const search = (data) => {
        return data.filter((item) => keys.some((key) => item[key].toLowerCase().includes(q)))
    }
    res.json(search(Users).splice(0, 10));
});

app.listen(port, () => console.log('listening on port ' + port));