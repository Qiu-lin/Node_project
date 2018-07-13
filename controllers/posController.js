const posModel = require( "../models/posModel" );

const posController = {
  add: function ( req, res, next ) {
    const { position, company, salary,site,experience,type } = req.body;
    let logo = "";
    if ( req.file )
      logo = "/upload/" + req.file.filename;

    console.log({ position, company, salary, logo,site,experience,type });


    posModel.save({ position, company, salary, logo,site,experience,type },
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
  },
  find: function ( req, res, next ) {
    const {id}  = req.query;
    posModel.findById( id, ( data ) => {
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
  },
  modify: function ( req, res, next ) {
    const { position, company, salary, site, experience, type, id, newLogo } = req.body;
    let logo = null;
    if ( req.file ) {
      logo = "/upload/" + req.file.filename;
    }
    posModel.update( { position, company, salary, site, experience, type, id, newLogo,logo },
      ( data ) => {
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
  },
  delete: function ( req, res, next ) {
    const {id}  = req.query;
    posModel.deleteById( id, (data)=> {
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
    });
  }

};
module.exports = posController;