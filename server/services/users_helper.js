module.exports = (function () {
  'use strict';

  var responsehelper  = require('./response_helper'),
    validateUser = require('./validate_users');

  /**
  * @param  {Object} Roles mongoose collection
  * @param  {String} roles role to add to document
  * @param  {Object} res instance of response
  * @param  {Object} req instance of request
  * @param  {Object} Documents mongoose collection to update
  * @param  {Integer} index of role number
  * updates access in documents
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

  var checkUser = function(err, user, req, res, jwt, app) {
    if(err) {
      send409Error(res, err);
    }
    user ? sendOkResponse(res, 200, {'token': getToken(user, jwt, app),
      'data': user}) :
    sendOkResponse(res, 200, {'data' : 'Invalid username or password'});
  };

  var send409Error = function(res, err) {
    responsehelper.response(res, 409,
      {error: err.message || err.errors[0].message});
  };

  var sendOkResponse = function(res, num, data) {
    responsehelper.response(res, num, data);
  };

  var send409Manual = function(res) {
    responsehelper.response(res, 409, {'error':
      'check manual for params'});
  };

  function saveUser(addUser, res, jwt, app) {
    addUser.save(function(err, user) {
      sendResponse(err, user, res, jwt, app);
    });
  }

  function sendResponse(err, user, res, jwt, app) {
    if(err) {
      send409Error(res, err);
    }
    if(user) {
      sendOkResponse(res, 201, {'token': getToken(user, jwt, app),
        'message':'user created'});
    }
  }

  function getToken(user, jwt, app) {
    return jwt.sign(user,
      app.get('superSecret'), { expiresIn : 60*60*24});
  }

  return {
    check: checkRole,
    send409Error: send409Error,
    sendOkResponse: sendOkResponse,
    send409Manual: send409Manual,
    checkUser: checkUser
  };

})();