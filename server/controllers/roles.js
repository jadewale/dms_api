(function() {

  'use strict';

  module.exports = (function(app, Schema, db) {
    var model = require('../model/role_model.json'),
      validateRole = require('../services/validate_roles'),
      roleSchema = new Schema(model).plugin(db.autoIncrement.plugin, 'Role'),
      Roles = db.connection.model('Role', roleSchema);
      app.set('roleModel',Roles);

    var createRole = function (req, res) {
      if(validateRole.validRoleCreation(req)){
        var addRole = new Roles(validateRole.parseData(req));
          addRole.save(function(err, role) {
            if (err){
              res.status(409).json({
              error: err.message || err.errors[0].message
              });
            }
            else{
              res.status(201).json({
                status: role
              });
            }
          });
      }
      else{
        res.status(409).json({
          error: 'check manual for required params'
        });
      }
    };

    var getRole = function (role, res) {
      Roles.findOne(role, function (err, roles) {
        if (err){
          res.status(500).json({
          error: err.message || err.errors[0].message
          });
        }
        else{
            res(roles);
          }
        });
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
      getRole : getRole,
      getRoles : getRoles
    };

  });

})();