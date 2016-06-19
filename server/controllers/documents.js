(function() {
  'use strict';

  module.exports = (function(app, Schema, db) {
    var model = require('../model/documents_model.json'),
      validateDocs = require('../services/validate_documents'),
      docSchema = new Schema(model).plugin(db.autoIncrement.plugin,'Document'),
      Roles = app.get('roleModel'),
      Documents = db.connection.model('Document',docSchema);

    var createDoc = function (req, res) {
      if(validateDocs.validDocCreation(req)){
        var addDoc = new Documents(validateDocs.parseDoc(req));
          addDoc.save(function(err,doc) {
            if (err){
              res.status(409).json({
              error: err.message || err.errors[0].message
              });
            }
            else{
              res.status(201).json({
                status: 'document saved',
                document : doc
              });
            }
          });
      }
      else{
        res.status(409).json({
          error : 'check manual for required params'
        });
      }

    };

    var getDocument = function (req, res) {
      Documents.findOne({_id : req.params.id},
        function(err,documents) {
          if (err) {
            res.status(409).json({
               error: 'All details Required' ||
              'Check manual for required params'
            });
          }
          else {
            res.json({'data' : documents});
          }
        });
    };

    var getAllDocuments = function (req, res) {
      Documents.find(validateDocs.getQueryDocs(req),
        validateDocs.getLimit(req),
        function(err,documents) {
        if (err) {
          res.status(409).json({
             error: 'All details Required' ||
            'Check manual for required params'
          });
        }
        else {
          console.log(documents);
          res.json({'data' : documents});
        }
      });
    };

    var getUserDocument = function (req, res) {
      Documents.find({ownerId:req.params.id}, function(err,documents) {
        if (err) {
          res.status(409).json({
             error: 'All details Required' ||
            'Check manual for required params'
          });
        }

        res.json(documents);
      });
    };

    var updateRole = function (req, res) {
      req.body.role.forEach(function(roles, index) {
        Roles.find({'title' : roles}, function (err, role) {
          if(err) {
            res.status(409).json({
              error: err.message || err.errors[0].message
            });
          }
          else if (role){
            var updates = validateDocs.roleUpdate(req);
            Documents.findOneAndUpdate({_id : req.params.id},
              {$set: updates[0],$push: {'access' : roles}},
              {new: true,
              runValidators: true},
              function(err, doc) {
                if(err){
                  res.status(409).json({
                  error: err.message || err.errors[0].message
                  });
                }
                else{
                  if(req.body.role.length === (index+ 1)){
                    res.status(200).json({
                      'success' : doc
                    });
                  }
                }
            });
          }
          else{
            res.status(409).json({
              error: roles+' does not exist'
            });
          }
        });
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
          if(err){
            res.status(409).json({
              error: err.message || err.errors[0].message
            });
          }
          else{
            res.status(201).json({
              data: doc
            });
          }
        });
      }
      else{
        res.status(409).json({
          error: 'please enter a valid id'
        });
      }
    };

    var removeDoc = function (req, res) {
      if(validateDocs.validDocId(req.params.id)){
        Documents.findOneAndRemove({_id: req.params.id, ownerId : req.query.id},
          function(err, doc) {
            if(err){
              res.status(409).json({
                error: err.message || err.errors[0].message
              });
            }
            res.status(200).json({
              data: doc + ' removed'
            });
        });
      }
      else{
        res.status(409).json({
          error: 'please enter a valid id'
        });
      }

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