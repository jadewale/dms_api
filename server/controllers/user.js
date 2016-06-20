(function() {
  'use strict';

  module.exports = (function(app, Schema, db, jwt, bcrypt) {
    var model = require('../model/user_model.json'),
      validateUser = require('../services/validate_users'),
      helper = require('../services/users_helper'),
      salt = bcrypt.genSaltSync(10),
      Roles = app.get('roleModel'),
      userSchema = new Schema(model).plugin(db.autoIncrement.plugin,'User'),
      Users = db.connection.model('User',userSchema);

      var createUser = function (req, res) {
        if(validateUser.validUserCreation(req)){
           Roles.find({'title' : req.body.role},
            function(err, role){
              helper.check(err, role, req, res, jwt, Users, bcrypt, salt, app);
           });
        }
      };

      var logIn = function (req, res) {
        validateUser.validLogInData(req) ?
          getUser(req, res, validateUser.parseLogInData(req,
            bcrypt, salt)) :  helper.send409Manual(res);
      };

      var getUser = function (req, res, data) {
        if(!data.username){
          data = {'username' : req.params.id};
        }
        Users.findOne(data, function (err, user) {
           helper.checkUser(err, user, req, res, jwt, app);
        });
      };

      var getAllUsers = function (req, res) {
        Users.find(function(err,users) {
          (err) ? helper.send409Manual(res):
          helper.sendOkResponse(res, 200, users);
        });
      };

      var updateUser = function (req, res) {
        validateUser.validUpdateData(req) ?
          Users.findOneAndUpdate({username: req.params.id},
            {$set:validateUser.pasreUpdateData(req)}, {new: true,
              runValidators: true},
            function(err, doc) {
              (err) ? helper.send409Error(res, err) :
              helper.sendOkResponse(res, 200, {'data': doc});
          }): res.status(409).json({error: 'check manual for required params'});
      };

      var deleteUser = function (req, res) {
        Users.findOneAndRemove({username : req.params.id},
          function(err, user) {
            (err) ? helper.send409Error(res, err): helper.sendOkResponse(res,
              200,{data: user + ' removed'});
        });
      };

      var logOut = function (req, res) {
        console.log('logout user');

      };

      return {
        createUser : createUser,
        logIn : logIn,
        getUser : getUser,
        getAllUsers : getAllUsers,
        updateUser : updateUser,
        deleteUser : deleteUser,
        logOut : logOut
      };
  });

})();
