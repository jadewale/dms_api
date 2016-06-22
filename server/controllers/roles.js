(function() {

  'use strict';

  module.exports = (function(app, Schema, db) {
    var model = require('../model/role_model.json'),
      validateRole = require('../services/validate_roles'),
      responsehelper  = require('../services/response_helper'),
      roleSchema = new Schema(model).plugin(db.autoIncrement.plugin, 'Role'),
      Roles = db.connection.model('Role', roleSchema);
      app.set('roleModel',Roles);

    var createRole = function (req, res) {
      if(validateRole.validRoleCreation(req)){
        var addRole = new Roles(validateRole.parseData(req));
          addRole.save(function(err, role) {
            if (err) {
              responsehelper.response(res, 409, {
                error: err.message || err.errors[0].message
              });
            }
            else{
              responsehelper.response(res, 201, {
                status: role
              });
            }
          });
      }
      else{
        responsehelper.response(res, 409, {
          error: 'check manual for required params'
        });
      }
    };

    var getRoles = function (req, res) {
      Roles.find(function (err, roles) {
        if (err){
          res.status(500).json({
          error: err.message || err.errors[0].message
          });
        }
        else{
          if(req === null){
            res(roles);
            return '';
          }
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