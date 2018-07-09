const posModel = require( "../models/posModel" );

const posController = {
  add: function ( req, res, next ) {
    const { position, company, salary } = req.body;
    posController.save( { position, company, salary }, ( data ) => {

    })
   }
}