/*
 * @param  {Object} instance of express
 * @param  {Object} instance of mongoose schema
 * @param  {Object} instance of mongoose
 * @param  {Object} instance of json web token for authentication
 * @param  {Object} instance of bcrypt for password encryption
 * passes objects above by reference to be used by roles route contollers
 * @return {void}
 */
module.exports = function(app, Schema, db, jwt) {
  'use strict';

  //roles controller which takes references of the objects above
  var Roles = require('../controllers/roles')(app, Schema, db),

    //authenticates roles have token for routes
    auth = require('../middleware/jstokensverification')(app, jwt);

  //authenticates all roles route below
  app.use('/roles/', auth.apiRoutes);

  //gets roles and creates roles
  app.route('/roles/')
    .get(Roles.getRoles)
    .post(Roles.createRole);
};