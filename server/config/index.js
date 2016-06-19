(function() {
  'use strict';

  //database config from .env file
  var config = {
    url: process.env.DATABASE_URL,
    dbName: process.env.DATABASE_NAME,
    dbPort: process.env.DATABASE_PORT,
    dbHost: process.env.DATABASE_HOST,
    dbUsername: process.env.DATABASE_USERNAME,
    dbPassword: process.env.DATABASE_PASSWORD,
    secretToken: process.env.SECRET_TOKEN
  };

  module.exports = config;

})();
