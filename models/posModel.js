const mongoose = require( "mongoose" );
mongoose.connect( "mongodb://localhost:27017/postionDatabase" );
const schema = mongoose.schema( {
  position: String,
  company: String,
  salary: Number
} );
const $position = mongoose.model( "position", schema );

const posModel = {
  save:function (positionInfo,success,error) {
    const $pos = new $position( positionInfo );
    $pos.save( ( err, data ) => {
      if ( err ) {
        error( err );
        return;
      }
      success( data );
    } );
  }
}

module.exports = posModel;