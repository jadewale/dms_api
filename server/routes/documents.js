/*
 * @param  {Object} instance of express
 * @param  {Object} instance of mongoose schema
 * @param  {Object} instance of mongoose
 * @param  {Object} instance of json web token for authentication
 * @param  {Object} instance of bcrypt for password encryption
 * passes objects above by reference to be used by documents route contollers
 * @return {void}
 */
module.exports = function(app, Schema, db, jwt) {
  'use strict';

  //documents controller which takes references of the objects above
  var Documents = require('../controllers/documents')(app, Schema, db),

    //authenticates documents carry token for routes
    auth = require('../middleware/jstokensverification')(app, jwt);

  //authenticates all documents route below
  app.use('/documents/', auth.apiRoutes);

  //gets user documents
  app.route('/users/:id/documents')
    .get(Documents.getUserDocument);

  //gets and creates documents
  app.route('/documents/')
    .get(Documents.getAllDocuments)
    .post(Documents.createDoc);

  //gets, updates and deletes a document
  app.route('/documents/:id')
    .get(Documents.getDocument)
    .put(Documents.updateDoc)
    .delete(Documents.removeDoc);
};