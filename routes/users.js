var express = require('express');
var router = express.Router();
var userController=require("../controllers/userController");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
} );

router.get( "/check", userController.checkLogin );

router.get( "/logout", userController.logout );


router.post( "/login", userController.login);

router.post( "/register", userController.register );

module.exports = router;
