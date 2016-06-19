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

      function send201Code(res, data) {
        responsehelper.response(res, 201, data);
      }

      function send409Manual(res) {
        responsehelper.response(res, 409, {'error':
          'check manual for params'});
      }

      function checkRole(err, role, req, res) {
        if(err) {
          send409Error(res, err);
        }
        if(role) {
          var addUser = new Users(validateUser
            .parseCreateData(req, bcrypt, salt));
          saveUser(addUser, res);
        }
        else{
          send409Manual(res);
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
          var object = {'token': getToken(user), 'message':'user created'};
          send201Code(res, object);
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
        if(validateUser.validLogInData(req)){
          getUser(req, res, validateUser.parseLogInData(req,
            bcrypt, salt));
        }
        else{
          res.status(409).json({
             error: 'All details Required' ||
              'Check manual for required params'
          });
        }

      };

      var getUser = function (req, res, data) {
        if(data.username === undefined){
          data = {'username' : req.params.id};
        }
        Users.findOne(data, function(err, user) {
          if (err) {
            res.status(409).json({
               error: 'All details Required' ||
              'Check manual for required params'
            });
          }
          if (!user){
            res.json({'data' : 'Invalid username or password'});
          }
          else{
            var token = jwt.sign(user, app.get('superSecret'), {
              expiresIn : 60*60*24
            });

            res.json({'data' : user, 'token' : token});
          }
        });
      };

      var getAllUsers = function (req, res) {
        Users.find(function(err,users) {
          if (err) {
            res.status(409).json({
               error: 'All details Required' ||
              'Check manual for required params'
            });
          }
          else {
            res.json(users);
          }
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
