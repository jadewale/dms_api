
(function () {
 'use strict';
 var db = require('mongoose'),
   role = require('../model/role_model.json'),
   user = require('../model/user_model.json'),
   doc = require('../model/documents_model.json'),
   object = [{'title': 'Administrator', 'id' : 1},
   {'title': 'User', 'id' : 2},
   {'title': 'Guest', 'id' : 3}];


 var options = {
      server : { poolSize : 5, reconnectTries : 5},
      user : 'USER',
      pass : ''
  };
   var uri = 'mongodb://localhost:27017/DocumentManagementSystem';
    db.connect(uri,options);
    db.connection.on('connected', function () {
      console.log('Default connection open');
    });
    var Schema = db.Schema;
    var Roles = db.model('Role', new Schema(role));
    var User = db.model('User', new Schema(user));
    var Documents = db.model('Documents', new Schema(doc));

   // Empty roles collection
   Roles.remove({}, function (err, role) {
   });

   // Empty user collection
   User.remove({}, function (err, rol) {
   });

   // Empty documents collection
   Documents.remove({}, function (err, doc) {
    object.forEach(function (obj, index) {

     var addRole = new Roles(obj);
     addRole.save(function (err, role) {
       err ? console.log(err) : (index === 2) ? process.exit(0): false;
     });

   });
   });

}());