const posModel = require( "../models/posModel" );

const posController = {
  add: function ( req, res, next ) {
    const { position, company, salary } = req.body;
    posController.save( { position, company, salary }, ( data ) => {
      res.json( {
        res_code: 0,
        res_error: "",
        res_body: data
      } );
    }, ( err ) => {
      res.json( {
        res_code: -1,
        res_error: err,
        res_body: {}
      } );
    } );
  }
};
module.exports = posController;