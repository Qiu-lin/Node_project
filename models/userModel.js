const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/positionDatabase");
const schema=mongoose.Schema({
  username:String,
  password:String,
  email:String
} );

const $user = mongoose.model( "user", schema );

const userModel = {
  save: function (userinfo,success,error) {
    const user = new $user( userinfo );
    user.save( ( err, userinfo ) => {
      if ( err ) {
        error( err );
        return;
      }
      success( userinfo );
     });
  },
  find:function () {  }
}

module.exports = userModel;
