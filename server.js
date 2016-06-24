'use strict';
var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  require('dotenv').config({silent: true});
}
var config = require('./server/config'),
    express = require('express'),
    routes = require('./server/routes'),
    db = require('./server/config/database'),
    Schema = db.connection.Schema,
    http = require('http'),
    jwt = require('jsonwebtoken'),
    bodyParser = require('body-parser'),
    bcrypt = require('bcrypt-nodejs'),
    app = express();

app.set('superSecret', config.secretToken);
app.set('express',express);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
routes(app, Schema, db, jwt, bcrypt);
var webserver = http.createServer(app).listen(process.env.PORT || 3000,
    function() {
  console.log('Express server listening on %d, in %s' +
    ' mode', webserver.address().port, app.get('env'));
});

module.exports = webserver;