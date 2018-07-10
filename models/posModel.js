const mongoose = require( "mongoose" );
mongoose.connect( "mongodb://localhost:27017/positionDatabase" );
const schema = mongoose.Schema( {
  position: String,
  company: String,
  salary: Number,
  logo:String
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
  },
  findByPage: function ( pageIndex, success, error ) {
    const pageSize = 5;
    $position.find().limit( pageSize )
      .skip( ( pageIndex - 1 ) * pageSize )
      .then( success, error );
    }
}
module.exports = posModel;