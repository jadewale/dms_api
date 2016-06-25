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

  // Documents controller which takes references of the objects above
  var Documents = require('../controllers/documents')(app, Schema, db),

    // Authenticates documents carry token for routes
    auth = require('../middleware/jstokensverification')(app, jwt);

  // Authenticates all documents route below
  app.use('/api/v1/documents/', auth.apiRoutes);

  // Gets user documents
  app.route('/api/v1/users/:id/documents/')
    .get(Documents.getUserDocument);

  // Gets and creates documents
  app.route('/api/v1/documents/')
    .get(Documents.getAllDocuments)
    .post(Documents.createDoc);

  // Gets, updates and deletes a document
  app.route('/api/v1/documents/:id')
    .get(Documents.getDocument)
    .put(Documents.updateDoc)
    .delete(Documents.removeDoc);

};