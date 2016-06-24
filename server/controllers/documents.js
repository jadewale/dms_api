(function() {
  'use strict';

  /**
  * @param  {Object} app instance of express
  * @param  {Object} Schema instance of mongoose Schema
  * @param  {Object} db instance of mongoose
  * @return {Object} functions to be called
  */
  module.exports = (function(app, Schema, db) {
    var model = require('../model/documents_model.json'),
      validateDocs = require('../services/validate_documents'),
      docSchema = new Schema(model).plugin(db.autoIncrement.plugin, 'Document'),
      Roles = app.get('roleModel'),
      docHelp = require('../services/users_helper'),
      helper = require('../services/documents_helper'),
      Documents = db.connection.model('Documents', docSchema);

    /**
    * @param  {Object} req request instance
    * @param  {Object} res response instance
    * creates user documents and saves in database
    * @return {Void}
    */
    var createDoc = function (req, res) {
      if (validateDocs.validDocCreation(req)) {
        var addDoc = new Documents(validateDocs.parseDoc(req));
          addDoc.save(function(err, doc) {
            (err) ? docHelp.send409Error(res, err):
              docHelp.sendOkResponse(res, 201,
                {'document': doc, 'status': 'document saved'});
          });
      }
      else{
        docHelp.send409Manual(res);
      }
    };

    /**
    * @param  {Object} req request instance
    * @param  {Object} res response instance
    * gets users documents and sends it in response
    * @return {Void}
    */
    var getDocument = function (req, res) {
      Documents.findOne({_id: req.params.id},
        function(err, documents) {
          sendResponse(err, documents, res);
      });
    };

    /**
    * @param  {Object} err db err
    * @param  {Object} documents db data
    * @param  {Object} res response instance
    * sends response to user
    * @return {Void}
    */
    function sendResponse(err, documents, res) {
       (err) ? docHelp.send409Manual(res):
          docHelp.sendOkResponse(res, 200, {'data': documents});
    }

    /**
    * @param  {Object} req request instance
    * @param  {Object} res response instance
    * gets documents with filters
    * @return {Void}
    */
    var getAllDocuments = function (req, res) {
      Documents.find(validateDocs.getQueryDocs(req))
      .sort({'createdAt': -1})
      .skip(validateDocs.paginate(req))
      .limit(validateDocs.paginate(req,'limit'))
      .exec(function(err, documents){
        sendResponse(err, documents, res);
      });
    };

    /**
    * @param  {Object} req request instance
    * @param  {Object} res response instance
    * gets documents belonging to a user
    * @return {Void}
    */
    var getUserDocument = function (req, res) {
      Documents.find({ownerId: req.params.id},
        function(err, documents) {
          err ? docHelp.send409Manual(res):
          docHelp.sendOkResponse(res, 200, documents);
        });
    };

    /**
    * @param  {Object} req request instance
    * @param  {Object} res response instance
    * updates user roles
    * @return {Void}
    */
    var updateRole = function (req, res) {
      req.body.role.forEach(function(roles, index) {
        helper.updateRoles(Roles, roles, res, req, Documents, index);
      });
    };

    /**
    * @param  {Object} req request instance
    * @param  {Object} res response instance
    * updates user documents
    * @return {Void}
    */
    var updateDoc = function (req, res) {
      if (validateDocs.validDocId(req.params.id)){
        if (req.body.role) {
          updateRole(req, res);
          return;
        }
        Documents.findOneAndUpdate({_id : req.params.id},
        {$set:validateDocs.parseDocsUpdate(req)}, {new: true,
          runValidators: true},
        function(err, doc) {
          err ? docHelp.send409Error(res, err): docHelp.sendOkResponse(res, 201,
            {'doc' : doc});
        });
      }
      else{
        docHelp.send409Manual(res);
      }
    };

    /**
    * @param  {Object} req request instance
    * @param  {Object} res response instance
    * deletes user document if request is from doc creator
    * @return {Void}
    */
    var removeDoc = function (req, res) {
      validateDocs.validDocId(req.params.id) ?
        Documents.findOneAndRemove({_id: req.params.id, ownerId:
          req.decoded._doc._id},
          function(err, doc) {
            (err) ? docHelp.send409Error(res, err):
            docHelp.sendOkResponse(res, 201, {'data': doc+' removed'});
        }) :
        docHelp.send409Manual(res);
    };

    return {
      createDoc : createDoc,
      getAllDocuments : getAllDocuments,
      getDocument : getDocument,
      getUserDocument : getUserDocument,
      updateDoc : updateDoc,
      removeDoc : removeDoc
    };

  });

})();