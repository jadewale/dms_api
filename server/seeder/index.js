module.exports = function () {
  'use strict';
  var seeder = require('mongoose-seed'),
    config = require('../config/index');
  var uri = config.url + config.dbPort + '/' + config.dbName;

  seeder.connect(uri, function () {
    seeder.loadModels([
      '../model/documents_model.json', '../model/role_model.json',
      '../model/user_model.json']);

    seeder.clearModels('model1','model2,model3', function () {

    });

  });

};