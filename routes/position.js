var express = require( "express" );
var router = express.Router();
var posController = require( "../controllers/posController" );

router.post( "/add", posController.add );

module.exports = router;