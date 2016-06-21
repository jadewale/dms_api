(function() {
  'use strict';

  var mongoose = require('mongoose'),
    config = require('./index'),
    autoIncrement = require('mongoose-auto-increment'),

    //configure connection pool and set reconnect tries
    options = {
      server : { poolSize : 5, reconnectTries : 5},
      user : config.dbUsername,
      pass : config.dbPassword
    };

    var uri = config.url + config.dbPort + '/' + config.dbName;
    mongoose.connect(uri, options);
    autoIncrement.initialize(mongoose);

    mongoose.connection.on('connected', function () {
      console.log('Default connection open');
    });

    // If the connection throws an error
    mongoose.connection.on('error',function (err) {
      console.log('Default connection error: ' + err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
      console.log('Default connection disconnected');
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function() {
      mongoose.connection.close(function () {
        console.log('Default connection disconnected through app termination');
        process.exit(0);
      });
    });

    module.exports = {
     'connection': mongoose,
     'autoIncrement': autoIncrement
    };

})();