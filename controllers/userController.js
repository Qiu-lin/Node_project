const userModel = require( "../models/userModel" );
const userController = {
  login: function ( req, res, next ) {
    const { username, password } = req.body;
    userModel.find( { username, password }, ( data ) => {
      console.log( data );
        if ( data.length === 1 ) {
          req.session.loginUser = data[0].username;
          res.json( {
            res_code: 0,
            res_error: "",
            res_body: { username: data[ 0 ].username, email: data[ 0 ].email }
          } );
        } else {
          res.json( {
            res_code: -2,
            res_error: "用户名或密码错误",
            res_body: {}
          } );
        }
      },( err ) => {
        res.json( {
          res_code: -1,
          res_error: err,
          res_body: {}
        } );
    } );
  },
  logout: function ( req, res, next ) {
    req.session = null;
    res.json( {
      res_code: 0,
      res_error: "",
      res_body: {}
    } );
  },
  checkLogin: function ( req, res, next ) {
    var user = req.session.loginUser;
    console.log(req.session);

    if ( user ) {
      res.json( {
        res_code: 0,
        res_error: "",
        res_body: {username:user}
      } );
    } else {
      res.json( {
        res_code: -1,
        res_error: "用户登录失败",
        res_body: {}
      } );
    }
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
  // check: function () { }
};
module.exports = userController;
