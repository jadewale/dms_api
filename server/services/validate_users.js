module.exports = (function () {
  'use strict';

  /*
   * @param  {Object} request object
   * checks request parameters are valid data
   * @return {Boolean} true if valid then false otherwise
   */
  var validUserCreation = function (req) {
    var valid = true,
      username = req.body.username,
      firstName = req.body.firstName,
      lastName = req.body.lastName,
      email = req.body.email,
      password = req.body.password,
      role = req.body.role;

    if((!isEmail(email)) || (!validData(lastName)) ||
      (!validData(firstName)) || (!validData(password)) ||
      (!validData(username)) || (!validData(role)) )  {
      valid = false;
    }

    return valid;
  };

  /*
   * @param  {Object} request object
   * checks request parameters are valid data
   * @return {Boolean} true if valid then false otherwise
   */
  var validLogInData = function (req) {
    var valid = true,
      username = req.body.username,
      password = req.body.password;

    if((!validData(username)) || (!validData(password))){
      valid = false;
    }

    return valid;
  };

  /*
   * @param  {Object} request object
   * checks request parameters are valid data
   * @return {Boolean} true if valid then false otherwise
   */
  var validUpdateData = function (req,app) {
    var valid = true,
      username = req.params.id,
      newusername = req.query.newusername,
      password = req.query.password,
      lastname = req.query.lastName,
      firstname = req.query.firstName,
      email = req.query.email,
      role = req.query.role;

    if(!validData(username)){
      valid = false;
    }
    if((newusername) && (!validData(username)) ){
      valid = false;
    }
    if((password) && (!validData(password)) ){
      valid = false;
    }
    if((lastname) && (!validData(lastname)) ){
      valid = false;
    }
    if((firstname) && (!validData(firstname)) ){
      valid = false;
    }
    if(role) {
      valid = false;
    }
    if((email) && (!isEmail(email)) ){
      valid = false;
    }

    return valid;
  };

  /*
   * @param  {Object} request
   * @param  {Object} bcrypt
   * @param  {Object} salt
   * sets request paramters to create user model
   * encrypts user password with salt and bcrypt
   * @return {Object} return user database schema object
   */
  var parseCreateData = function (req, bcrypt, salt) {
      return {
        'username': req.body.username,
        'name': {
          'first': req.body.firstName,
          'last': req.body.lastName
        },
        'email': req.body.email,
        'password': bcrypt.hashSync(req.body.password, salt),
        'role': req.body.role
      };
  };

  /*
   * @param  {Object} request
   * @param  {Object} bcrypt
   * @param  {Object} salt
   * sets request paramters to log in user
   * encrypts user password with salt and bcrypt
   * @return {Object} return user database schema object
   */
  var parseLogInData = function (req, bcrypt, salt) {
      return {
      'username': req.body.username,
      'password': bcrypt.hashSync(req.body.password, salt)
    };
  };

  /*
   * @param  {Object} request
   * builds update data
   * @return {Object} return user database schema object for update
   */
  var parseUpdateData = function (req) {
    var objectBuilder = {};
    objectBuilder.name = req.decoded._doc.name;

    if (req.query.newusername) {
      objectBuilder.username = req.query.newusername;
    }
    if (req.query.firstName) {
      objectBuilder.name.first = req.query.firstName;
    }
    if (req.query.lastName) {
      objectBuilder.name.last = req.query.lastName;
    }
    if (req.query.email) {
      objectBuilder.email = req.query.email;
    }
    if (req.query.password) {
      objectBuilder.password = req.query.password;
    }
    if (req.query.role) {
      objectBuilder.role = req.query.role;
    }

    return objectBuilder;
  };

  /*
   * @param  {String} data
   * checks data contains numbers and non alphabets
   * @return {Boolean} return true and false otherwise
   */
  function validData(data){
    return (data)? (/([\d+\W+])+/gi.test(data)) ? false: true : false;
  }

  /*
   * @param  {String} data
   * checks data contains a valid email
   * @return {Boolean} return true and false otherwise
   */
  function isEmail(data){
    return (data) ? (/([a-z]+(.)[\w+]+[@][\w+]+[.][\w]+)/.test(data)) ?
      true : false : false;
  }

  return {
    validUserCreation: validUserCreation,
    parseCreateData: parseCreateData,
    validLogInData: validLogInData,
    parseLogInData: parseLogInData,
    validUpdateData: validUpdateData,
    parseUpdateData: parseUpdateData
  };

})();