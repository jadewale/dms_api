(function() {
  'use strict';

  module.exports = (function(app, Schema, db, jwt, bcrypt) {
    var model = require('../model/user_model.json'),
      validateUser = require('../services/validate_users'),
      responsehelper  = require('../services/response_helper'),
      salt = bcrypt.genSaltSync(10),
      Roles = app.get('roleModel'),
      userSchema = new Schema(model).plugin(db.autoIncrement.plugin,'User'),
      Users = db.connection.model('User',userSchema);

      function send409Error(res, err) {
        responsehelper.response(res, 409,
          {error: err.message || err.errors[0].message});
      }

      function sendOkResponse(res, num, data) {
        responsehelper.response(res, num, data);
      }

      function send409Manual(res) {
        responsehelper.response(res, 409, {'error':
          'check manual for params'});
      }

      function checkRole(err, role, req, res) {
        if(err) {
          send409Error(res, err);
        }
        if(role.length) {
          var addUser = new Users(validateUser
            .parseCreateData(req, bcrypt, salt));
          saveUser(addUser, res);
        }
        else{
          responsehelper.response(res, 409, {'error': 'undefined role'});
        }
      }

      function saveUser(addUser, res) {
        addUser.save(function(err, user) {
          sendResponse(err, user, res);
        });
      }

      function sendResponse(err, user, res) {
        if(err) {
          send409Error(res, err);
        }
        if(user) {
          sendOkResponse(res, 201, {'token': getToken(user),
            'message':'user created'});
        }
      }

      function getToken(user) {
        return jwt.sign(user,
          app.get('superSecret'), { expiresIn : 60*60*24});
      }

      var createUser = function (req, res) {
        if(validateUser.validUserCreation(req)){
           Roles.find({'title' : req.body.role},
            function(err, role){
              checkRole(err, role, req, res);
            });
        }
      };

      var logIn = function (req, res) {
        validateUser.validLogInData(req) ?
          getUser(req, res, validateUser.parseLogInData(req,
            bcrypt, salt)) :  send409Manual(res);
      };

      function checkUser(err, user, req, res) {
        if(err) {
          send409Error(res, err);
        }
        user ? sendOkResponse(res, 200, {'token': getToken(user),
          'data': user}) :
        sendOkResponse(res, 200, {'data' : 'Invalid username or password'});
      }

      var getUser = function (req, res, data) {
        if(!data.username){
          data = {'username' : req.params.id};
        }
        Users.findOne(data, function (err, user) {
          checkUser(err, user, req, res);
        });
      };

      var getAllUsers = function (req, res) {
        Users.find(function(err,users) {
          (err) ? send409Manual(res): sendOkResponse(res, 200, users);
        });
      };

      var updateUser = function (req, res) {
        if(validateUser.validUpdateData(req)){
          Users.findOneAndUpdate({username : req.params.id},
            {$set:validateUser.pasreUpdateData(req)}, {new: true,
              runValidators: true},
            function(err, doc) {
              if(err){
                res.status(409).json({
                  error: err.message || err.errors[0].message
                });
              }
              else{
                res.status(200).json({
                  data: doc
                });
              }
          });
        }

        res.status(409).json({error: 'check manual for required params'});
      };

      var deleteUser = function (req, res) {
        Users.findOneAndRemove({username : req.params.id},
          function(err, user) {
            if(err){
              res.status(409).json({
                error: err.message || err.errors[0].message
              });
            }
            else{
              res.status(200).json({
                data: user + ' removed'
              });
          }
        });
      };

      var logOut = function () {
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
