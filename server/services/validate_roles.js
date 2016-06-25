module.exports = (function () {
  'use strict';

  /**
  * @param  {Object} req instance of request
  * checks if role number contains numbers and spaces
  * @return {Boolean} true if data is valid
  */
  var validRoleCreation = function (req) {
    return validData(req.body.title);
  };

  /**
  * @param  {Object} req instance of request
  * creates database model
  * @return {Object}  database model
  */
  var parseData = function (req) {
    return {'title': req.body.title};
  };

  /**
  * @param  {String} data
  * checks if data is valid by checking presence of
  * numbers and non alphabets
  * @return {Boolean}  false if it contains
  */
  function validData(data) {
    return (data)? (/([\d+\W+])+/gi.test(data)) ? false: true : false;
  }

  // functions to be called
  return {
    validRoleCreation : validRoleCreation,
    parseData : parseData
  };

})();