module.exports = (function () {
  'use strict';

  var response = function(res, code, data) {
    res.status(code).json(data);
  };

  return {
    response : response
  };

})();