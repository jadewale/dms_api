(function() {
  'use strict';

  /**
   * @param  {Object} instance of express
   * @param  {Object} instance of mongoose schema
   * @param  {Object} instance of mongoose
   * @param  {Object} instance of json web token for authentication
   * @param  {Object} instance of bcrypt for password encryption
   * passes objects above by reference to be used by route contollers
   * @return {void}
   */
  module.exports = function(app, Schema, db, jwt, bcrypt) {
    //routes roles
    require('./roles')(app, Schema, db, jwt);

    //routes users
    require('./users')(app, Schema, db, jwt, bcrypt);

    //routes documents
    require('./documents')(app, Schema, db, jwt);
  };

})();