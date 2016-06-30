(function() {
  'use strict';

   var model = require('../model/role_model.json'),
      validateRole = require('../services/validate_roles'),
      responseHelper  = require('../services/response_helper');

  /**
  * @param  {Object} app instance of express
  * @param  {Object} Schema instance of mongoose Schema
  * @param  {Object} db instance of mongoose
  * @return {Object} functions to be called
  */
  module.exports = (function(app, Schema, db) {
    var roleSchema = new Schema(model).plugin(db.autoIncrement.plugin, 'Role'),
      Roles = db.connection.model('Role', roleSchema);
      app.set('roleModel', Roles);

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
            err ? responseHelper.errorRes(res, 409, err):
              responseHelper.successRes(res, 201, role);
          });
      }
      else{
        responseHelper.errorRes(res, 409, 'default');
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
        err ? responseHelper.errorRes(res, 500, err):
          responseHelper.successRes(res, 200, roles);
      });
    };

    return {
      createRole : createRole,
      getRoles : getRoles
    };

  });

})();