module.exports = (function () {
  'use strict';

  var responsehelper  = require('./response_helper'),
    validateUser = require('./validate_users');

  /**
  * @param  {Object} err mongoose error
  * @param  {String} roles role to add to document
  * @param  {Object} req instance of request
  * @param  {Object} res instance of response
  * @param  {Object} jwt instance of route authentication
  * @param  {Object} Users mongoose model
  * @param  {Object} bcrypt instance of bcrypt to encrypt password
  * @param  {Object} salt encrpt password with bcrypt
  * @param  {Object} app instance of express
  * saves user information if they have a valid role
  * @return {Void}
  */
  var checkRole = function(err, role, req, res, jwt, Users, bcrypt, salt, app) {
    if(err) {
      send409Error(res, err);
    }
    if(role.length) {
      var addUser = new Users(validateUser
        .parseCreateData(req, bcrypt, salt));
      saveUser(addUser, res, jwt, app);
    }
    else{
      responsehelper.response(res, 409, {'error': 'undefined role'});
    }
  };

  /**
  * @param  {Object} err mongoose error
  * @param  {String} user user object found in database
  * @param  {Object} req instance of request
  * @param  {Object} res instance of response
  * @param  {Object} jwt instance of route authentication
  * @param  {Object} app instance of express
  * checks if user exist in the database and sends response
  * depending on the result
  * @return {Void}
  */
  var checkUser = function(err, user, req, res, jwt, app) {
    if(err) {
      send409Error(res, err);
    }
    user ? sendOkResponse(res, 200, {'token': getToken(user, jwt, app),
      'data': user}) :
    sendOkResponse(res, 200, {'data' : 'Invalid username or password'});
  };

  /**
  * @param  {Object} res instance of response
  * @param  {Object} err mongoose error
  * send error response with 409 status code
  * @return {Void}
  */
  var send409Error = function(res, err) {
    responsehelper.response(res, 409,
      {error: err.message || err.errors[0].message});
  };

  /**
  * @param  {Object} res instance of response
  * @param  {Object} num response status code
  * @param  {Object} data response object to send
  * sends ok response usually 20x
  * @return {Void}
  */
  var sendOkResponse = function(res, num, data) {
    responsehelper.response(res, num, data);
  };

  /**
  * @param  {Object} res instance of response
  * send static error report when user misses required parameters
  * @return {Void}
  */
  var send409Manual = function(res) {
    responsehelper.response(res, 409, {'error':
      'check manual for params'});
  };

  /**
  * @param  {Object} addUser User collection in mongoose
  * @param  {Object} res instance of response
  * @param  {Object} jwt instance of route authentication
  * @param  {Object} app instance of express
  * save user to database and send response
  * @return {Void}
  */
  function saveUser(addUser, res, jwt, app) {
    addUser.save(function(err, user) {
      sendResponse(err, user, res, jwt, app);
    });
  }

  /**
  * @param  {Object} err mongoose error
  * @param  {Object} user user object found in database
  * @param  {Object} res instance of response
  * @param  {Object} jwt instance of route authentication
  * @param  {Object} app instance of express
  * sends response to user
  * @return {Void}
  */
  function sendResponse(err, user, res, jwt, app) {
    if(err) {
      send409Error(res, err);
    }
    if(user) {
      sendOkResponse(res, 201, {'token': getToken(user, jwt, app),
        'message':'user created'});
    }
  }

  /**
  * @param  {Object} user user object found in database
  * @param  {Object} jwt instance of route authentication
  * @param  {Object} app instance of express
  * creates user token and sets expiration to 24 hours
  * @return {Void}
  */
  function getToken(user, jwt, app) {
    return jwt.sign(user,
      app.get('superSecret'), { expiresIn : 60*60*24});
  }

  // functions returned
  return {
    check: checkRole,
    send409Error: send409Error,
    sendOkResponse: sendOkResponse,
    send409Manual: send409Manual,
    checkUser: checkUser
  };

})();