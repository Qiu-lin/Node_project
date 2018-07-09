var express = require('express');
var router = express.Router();
var userController=require("../controllers/userController");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get("/login",function(req,res,next){
  res.send("login");
});

router.post( "/register", userController.register );

router.get("/check",function(req,res,next){
  res.send("check");
});
module.exports = router;
