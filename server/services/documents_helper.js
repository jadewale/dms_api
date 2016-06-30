module.exports = (function () {
  'use strict';

  var responseHelper  = require('./response_helper'),
    validateDoc = require('./validate_documents');

  /**
  * @param  {Object} mongoose collection
  * @param  {String} roles role to add to document
  * @param  {conn} res and req instance
  * @param  {Integer} index of role number
  * updates access in documents
  * @return {Void}
  */
  var updateRoles = function (Collections, roles, conn, index) {
    var Roles = Collections.role;
    var Doc = Collections.doc;
    Roles.find({'title': roles}, function(err, data) {
      parseRole(err, data, conn, Doc, roles, index);
    });
  };

  var parseCollections = function (roles, documents) {
    return {
      'role': roles,
      'doc': documents
    };
  };

  var parseConn = function (res, req) {
    return {
      'res': res,
      'req': req
    };
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
  function parseRole(err, data, conn, Documents, roles, index) {
    err ? responseHelper.response(conn.res, 409, {'error': err.message})
    : findDoc(Documents, conn, roles, data, index);
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
  function findDoc(Documents, conn, roles, data, index) {
    if(!data){
      responseHelper.response(conn.res, 409, {
        'error': roles + 'does not extist'} );
      return '';
    }

    var updates = validateDoc.roleUpdate(conn.req);
    Documents.findOneAndUpdate({'_id': conn.req.params.id},
     { $set: updates[0], $push: { 'access' : roles } },
     { new: true, runValidators: true }, function(err, docs) {
      updateDoc(conn.req, err, docs, conn.res, index);
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
    updateRoles: updateRoles,
    parseCollections: parseCollections,
    parseConn: parseConn
  };

})();