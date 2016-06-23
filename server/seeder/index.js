
(function () {
 'use strict';
 var db = require('mongoose'),
   model = require('../model/role_model.json'),
   object = [{'title': 'Administrator', 'id' : 1},
   {'title': 'Guest', 'id' : 2},
   {'title': 'User', 'id' : 3}];

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
    var Roles = db.model('Role', new Schema(model));

   Roles.remove({}, function (err, role) {
    if(err)
    console.log(err);
   });
   object.forEach(function (obj, index) {

     var addRole = new Roles(obj);
     addRole.save(function (err, role) {
       err ? console.log(err) : (index === 2) ? process.exit(0): false;
     });

   });



}());