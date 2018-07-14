const posModel = require( "../models/posModel" );
const fs = require( "fs" );

const posController = {
  add: function ( req, res, next ) {
    const { position, company, salary,site,experience,type } = req.body;
    let logo = "";
    if ( req.file )
      logo = "/upload/" + req.file.filename;
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
    const { position, company, salary, site, experience, type, id, oldLogo } = req.body;
    let logo = oldLogo;
    //判断是否请求头里是否有文件信息
    if ( req.file ) {
      //添加新logo路径信息
      logo = "/upload/" + req.file.filename;
      //在目录中删除原来logo文件
      fs.unlink( "./public"+oldLogo, function ( err ) {
        if ( err ) {
          return console.log(err);
        }
        console.log("Modify Function: delete oldLogo success!");
      } );
    }

    posModel.update( { position, company, salary, site, experience, type, id,logo },
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
    const { id, logo } = req.query;
    //删除此职位信息中的logo文件
    if ( logo ) {
      fs.unlink( "./public"+logo, function ( err ) {
        if ( err ) {
          return console.log(err);
        }
        console.log("delete logo success!");
      } );
    }
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