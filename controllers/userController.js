const userModel = require( "../models/userModel" );
const userController = {
  login: function () {

  },
  register: function ( req, res, next ) {
    const { username, password, email } = req.body;
    userModel.save( { username, password, email }, ( msg ) => {
      res.json( {
        res_code: 0,
        res_error: "",
        res_body: msg
      } );
    },( err ) => {
        res.json( {
          res_code: -1,
          res_error: err,
          res_body: {}
        } );
      } );
  },
  check: function () { }
};
module.exports = userController;
