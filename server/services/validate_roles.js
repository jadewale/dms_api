module.exports = (function (){
  'use strict';

  var validRoleCreation = function (req) {
    return validData(req.body.title);
  };

  var parseData = function (req) {
    return {'title': req.body.title};
  };

  function validData(data) {
    return (data)? (/([\d+\W+])+/gi.test(data)) ? false: true : false;
  }

  return {
    validRoleCreation : validRoleCreation,
    parseData : parseData
  };

})();