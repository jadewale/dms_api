(function() {
  'use strict';

  /**
  * @param  {Object} app instance of express
  * @param  {Object} Schema instance of mongoose Schema
  * @param  {Object} db instance of mongoose
  * @return {Object} functions to be called
  */
  module.exports = (function(app, Schema, db) {
    var model = require('../model/role_model.json'),
      validateRole = require('../services/validate_roles'),
      responsehelper  = require('../services/response_helper'),

      // Set role schema to use auto increment in creating ID
      roleSchema = new Schema(model).plugin(db.autoIncrement.plugin, 'Role'),
      Roles = db.connection.model('Role', roleSchema);
      app.set('roleModel',Roles);

    /**
    * @param  {Object} req request instance
    * @param  {Object} res response instance
    * creates user roles to access documents
    * @return {Void}
    */
    var createRole = function (req, res) {
      if(validateRole.validRoleCreation(req)){
        var addRole = new Roles(validateRole.parseData(req));
          addRole.save(function(err, role) {
            err ?
              responsehelper.response(res, 409, {
                error: err.message || err.errors[0].message
              }):
              responsehelper.response(res, 201, {
                status: role
              });
          });
      }
      else{
        responsehelper.response(res, 409, {
          error: 'check manual for required params'
        });
      }
    };

    /**
    * @param  {Object} req request instance
    * @param  {Object} res response instance
    * gets all the roles in the database
    * @return {Void}
    */
    var getRoles = function (req, res) {
      Roles.find(function (err, roles) {
        if (err) {
          responsehelper.response(res, 500, {
            error: err.message || err.errors[0].message
          });
        }
        else{
          res.status(200).json({
            role : roles
          });
        }
      });
    };

    return {
      createRole : createRole,
      getRoles : getRoles
    };

  });

})();