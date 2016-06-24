module.exports = (function () {
  'use strict';

  /**
  * @param  {Object} res instance of response
  * @param  {Object} code response cod status
  * @param  {Object} response message
  * send response to user
  * @return {Void}
  */
  var response = function(res, code, data) {
    res.status(code).json(data);
  };

  // Function to be called
  return {
    response : response
  };

})();