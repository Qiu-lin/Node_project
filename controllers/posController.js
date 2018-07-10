const posModel = require( "../models/posModel" );

const posController = {
  add: function ( req, res, next ) {
    const { position, company, salary } = req.body;
    let logo = "";
    if ( req.file )
      logo = "/upload/" + req.file.filename;
    posModel.save(
      { position, company, salary, logo },
      ( data ) => {
        res.json( {
          res_code: 0,
          res_error: "",
          res_body: data
        } );
      },
      ( err ) => {
        res.json( {
          res_code: -1,
          res_error: err,
          res_body: {}
        } );
      } );
  },

  list: function ( req, res, next ) {
    const { pageIndex } = req.query;
    posModel.findByPage( pageIndex, ( data ) => {
      res.json( {
        res_code: 0,
        res_error: "",
        res_body: data
      } )
    }, ( err ) => {
      res.json( {
        res_code: -1,
        res_error: err,
        res_body: {}
      } )
    } );
   }

};
module.exports = posController;