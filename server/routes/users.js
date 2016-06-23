/*
 * @param  {Object} instance of express
 * @param  {Object} instance of mongoose schema
 * @param  {Object} instance of mongoose
 * @param  {Object} instance of json web token for authentication
 * @param  {Object} instance of bcrypt for password encryption
 * passes objects above by reference to be used by user route contollers
 * @return {void}
 */
module.exports = function(app, Schema, db, jwt, bcrypt) {
  'use strict';

  //user controller which takes references of the objects above
  var Users = require('../controllers/user')(app, Schema, db, jwt, bcrypt),

    //authenticates users have token for routes
    auth = require('../middleware/jstokensverification')(app, jwt);


  //logs users in
  app.route('/users/login')
    .post(Users.logIn);

  //creates a user account
  app.route('/users/')
    .post(Users.createUser);

  //authenticates all users route below
  app.use('/users/', auth.apiRoutes);

  //logs user out
  app.route('/users/logout')
    .post(Users.logOut);

  //gets all users
  app.route('/users/')
    .get(Users.getAllUsers);

  //gets,update and deletes a user
  app.route('/users/:id')
    .get(Users.getUser)
    .put(Users.updateUser)
    .delete(Users.deleteUser);



};