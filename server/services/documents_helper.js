module.exports = (function () {
  'use strict';

  var responseHelper  = require('./response_helper'),
    validateDoc = require('./validate_documents');

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
  var updateRoles = function (Roles, roles, res, req, Documents, index) {
    Roles.find({'title': roles}, function(err, role) {
      parseRole(err, role, res, req, Documents, roles, index);
    });
  };

  /**
  * @param  {Object} err mongoose error
  * @param  {String} role role to add to document
  * @param  {Object} res instance of response
  * @param  {Object} req instance of request
  * @param  {Object} Documents mongoose collection to update
  * @param  {Object} roles the role returned by Roles collection
  * @param  {Integer} index of role number
  * finds document to update access
  * @return {Void}
  */
  function parseRole(err, role, res, req, Documents, roles, index) {
    err ? responseHelper.response(res, 409, {'error': err.message})
    : findDoc(Documents, req, res, roles, role, index);
  }

  /**
  * @param  {Object} Documents mongoose collection to update
  * @param  {Object} res instance of response
  * @param  {Object} req instance of request
  * @param  {String} roles role to add to document
  * @param  {Object} role the role returned by Roles collection
  * @param  {Integer} index of role number
  * checks if role exist and updates if true else returns 409 error
  * @return {Void}
  */
  function findDoc(Documents, req, res, roles, role, index) {
    if(!role){
      responseHelper.response(res, 409, { 'error': roles + 'does not extist'} );
      return '';
    }

    var updates = validateDoc.roleUpdate(req);
    Documents.findOneAndUpdate({'_id': req.params.id},
     { $set: updates[0], $push: { 'access' : roles } },
     { new: true, runValidators: true }, function(err, docs) {
      updateDoc(req, err, docs, res, index);
     });
  }

  /**
  * @param  {Object} req instance of request
  * @param  {Object} err mongoose error
  * @param  {Object} docs object returned by database
  * @param  {Object} res instance of response
  * @param  {Integer} index of role number
  * sends response to user after last update
  * @return {Void}
  */
  function updateDoc(req, err, docs, res, index) {
    err ? responseHelper.response(res, 409, err) :
    (req.body.role.length === (index + 1)) ?
    responseHelper.response(res, 200, {'success' : docs}) : '';
  }

  // function to be called
  return {
    updateRoles: updateRoles
  };

})();