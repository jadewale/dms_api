(function() {
  'use strict';

  /**
  * @param  {Object} app instance of express
  * @param  {Object} Schema instance of mongoose Schema
  * @param  {Object} db instance of mongoose
  * @return {Object} functions to be called
  */
  module.exports = (function(app, Schema, db, jwt, bcrypt) {
    var model = require('../model/user_model.json'),
      validateUser = require('../services/validate_users'),
      helper = require('../services/users_helper'),
      salt = bcrypt.genSaltSync(10),
      Roles = app.get('roleModel'),
      userSchema = new Schema(model).plugin(db.autoIncrement.plugin,'User'),
      Users = db.connection.model('User',userSchema);

      /**
      * @param  {Object} req request instance
      * @param  {Object} res response instance
      * creates users and saves in the database
      * @return {Void}
      */
      var createUser = function (req, res) {
        validateUser.validUserCreation(req) ?
           Roles.find({'title' : req.body.role},
            function(err, role){
              helper.check(err, role, req, res, jwt, Users, bcrypt, salt, app);
           })
        : res.status(409).json({error: 'check manual for required params'});
      };

      /**
      * @param  {Object} req request instance
      * @param  {Object} res response instance
      * logs users in and gives them token for authentication
      * @return {Void}
      */
      var logIn = function (req, res) {
        validateUser.validLogInData(req) ?
          getUser(req, res, validateUser.parseLogInData(req,
            bcrypt, salt)) :  helper.send409Manual(res);
      };

      /**
      * @param  {Object} req request instance
      * @param  {Object} res response instance
      * gets a user in the database
      * @return {Void}
      */
      var getUser = function (req, res, data) {
        if (!data.username) {
          data = {'_id': req.params.id};
        }
        Users.findOne(data, function (err, user) {
           helper.checkUser(err, user, req, res, jwt, app);
        });
      };

      /**
      * @param  {Object} req request instance
      * @param  {Object} res response instance
      * gets all users in the database
      * @return {Void}
      */
      var getAllUsers = function (req, res) {
        Users.find(function(err,users) {
          (err) ? helper.send409Manual(res):
            helper.sendOkResponse(res, 200, users);
        });
      };

      /**
      * @param  {Object} req request instance
      * @param  {Object} res response instance
      * updates a user
      * @return {Void}
      */
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

      /**
      * @param  {Object} req request instance
      * @param  {Object} res response instance
      * deletes a user from the database
      * @return {Void}
      */
      var deleteUser = function (req, res) {
        Users.findOneAndRemove({username : req.params.id},
          function(err, user) {
            (err) ? helper.send409Error(res, err): helper.sendOkResponse(res,
              200,{deleted: user + ' removed'});
        });
      };

      /**
      * @param  {Object} req request instance
      * @param  {Object} res response instance
      * logs a user out by not returning a token to the response
      * @return {Void}
      */
      var logOut = function (req, res) {
        helper.sendOkResponse(res, 200, {'message': 'user logged out'});
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
