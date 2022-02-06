const session = require("express-session");
const store = require("connect-mongo");
const mongoose = require('mongoose');

module.exports = app => {
app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        maxAge: 1200000,
      },
      store: store.create({
        mongoUrl: "mongodb://localhost/lab-express-basic-auth",
      }),
    })
  );
};