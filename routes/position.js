var express = require( "express" );
var router = express.Router();
var posController = require( "../controllers/posController" );

var multer = require( "multer" );

var storage = multer.diskStorage( {
  destination: function ( req, file, cb ) {
    cb( null, "./public/upload" );
  },
  filename: function ( req, file, cb ) {
    cb( null, file.fieldname + "-" + Date.now() + file.originalname.slice( file.originalname.lastIndexOf( "." ) ) );
   }
} );
var upload = multer( { storage: storage } );


router.post( "/add",upload.single("logo") ,posController.add );
router.get( "/list", posController.list );
router.get( "/find",  posController.find);
router.get( "/delete",  posController.delete);

module.exports = router;