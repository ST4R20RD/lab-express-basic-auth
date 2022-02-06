const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const express = require("express");
const hbs = require("hbs");

const router = express.Router();

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post("/signin", async (req, res) => {
  const user = new User();
  const hash = await bcrypt.hash(req.body.password, 10);
  user.username = req.body.username;
  user.password = hash;
  try {
    await user.save();
    res.redirect("/users/login");
  } catch (error) {
    res.redirect("/users/signin");
  }
});

router.get("/login", (req, res) => {
  res.render("login", { message: '' });
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    const isPwCorrect = await bcrypt.compare(req.body.password, user.password);
    if (isPwCorrect) {
      req.session.currentUser = user;
      res.redirect("/users/profile");
    } else {
      res.redirect("/users/login");
    }
  } else {
    res.redirect("/users/login");
  }
});

router.get("/profile", (req, res) => {
  const user = req.session.currentUser;
  res.render("profile", { user });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/users/login");
});
module.exports = router;
