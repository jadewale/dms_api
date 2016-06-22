(function() {
  'use strict';

  module.exports = (function(app, Schema, db) {
    var model = require('../model/documents_model.json'),
      validateDocs = require('../services/validate_documents'),
      docSchema = new Schema(model).plugin(db.autoIncrement.plugin,'Document'),
      Roles = app.get('roleModel'),
      docHelp = require('../services/users_helper'),
      helper = require('../services/documents_helper'),
      Documents = db.connection.model('Document',docSchema);

    var createDoc = function (req, res) {
      if(validateDocs.validDocCreation(req)) {
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

    var getDocument = function (req, res) {
      Documents.findOne({_id: req.params.id},
        function(err, documents) {
          sendResponse(err, documents, res);
      });
    };

    function sendResponse(err, documents, res) {
       (err) ? docHelp.send409Manual(res):
          docHelp.sendOkResponse(res, 200, {'data': documents});
    }

    var getAllDocuments = function (req, res) {
      Documents.find(validateDocs.getQueryDocs(req),
        validateDocs.getLimit(req),
        function(err, documents) {
          sendResponse(err, documents, res);
      });
    };

    var getUserDocument = function (req, res) {
      Documents.find({ownerId: req.params.id},
        function(err, documents) {
          err ? docHelp.send409Manual(res):
          docHelp.sendOkResponse(res, 200, documents);
        });
    };

    var updateRole = function (req, res) {
      req.body.role.forEach(function(roles, index) {
        helper.updateRoles(Roles, roles, res, req, Documents, index);
      });
    };

    var updateDoc = function (req, res) {
      if(validateDocs.validDocId(req.params.id)){
        if(req.body.role){
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

    var removeDoc = function (req, res) {
      validateDocs.validDocId(req.params.id) ?
        Documents.findOneAndRemove({_id: req.params.id, ownerId : req.query.id},
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