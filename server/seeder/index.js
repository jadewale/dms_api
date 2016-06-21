module.exports = function () {
  'use strict';
  var seeder = require('mongoose-seed'),
    config = require('../config/index');
  var uri = config.url + config.dbPort + '/' + config.dbName;
  console.log('test');

  var roles = ['Administrator', 'User', 'Guest',];
  var user = [{'username': 'Joliphizzle', 'password': 'Jolaade',
   'firstName': 'Jolaade', 'lastName':'Adewale',
   'email':'jbadewale@yahoo.com', 'role':'Guest'}];

   var documents = [];

  seeder.connect(uri, function () {
    seeder.loadModels([
      '../model/documents_model.json', '../model/role_model.json',
      '../model/user_model.json']);

    seeder.clearModels('model1','model2,model3', function () {

    });

  });

};