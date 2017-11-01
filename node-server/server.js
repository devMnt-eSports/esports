const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const massive = require("massive");
const passport = require("passport");
const config = require(`${__dirname}/config.js`);
const { pgSecret } = config;

const port = 3000;

const connectionString = `postgres://postgres:${pgSecret}@wasd.link/postgres`;

const app = express();

app.use("/", express.static(`${__dirname}/src`));

app.use(bodyParser());
app.use(cors());

massive(connectionString).then(db => app.set("db", db));

// app.use(
//   session({
//     secret: secret,
//     resave: true,
//     saveUninitialized: true
//   })
// );

app.get("/api/users", (req, res, next) => {
  console.log("hit");
  const db = app.get("db");
  db
    .run(`SELECT * FROM users`)
    .then(response => res.status(200).send(response))
    .catch(error => console.log(error));
});

app.listen(port, () => {
  console.log(`It's over ${port}!`);
});
