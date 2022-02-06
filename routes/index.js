const router = require("express").Router();
const hbs = require('hbs');
const isLoggedIn = require('../middleware/guard')

/* GET home page */
router.get("/", isLoggedIn, async (req, res, next) => {
  res.render("index");
});

const userRoutes = require('./user.routes')
router.use('/users', userRoutes)

router.get('/main', isLoggedIn, (req, res, next) => {
  res.render('users/main', { userInSession: req.session.currentUser });
});

router.get('/private', isLoggedIn, (req, res, next) => {
  res.render('users/private', { userInSession: req.session.currentUser });
});

module.exports = router;
