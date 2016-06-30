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

  /**
  * @param  {Object} res instance of response
  * @param  {Object} code response cod status
  * @param  {Object} response message
  * sends error response to user
  * @return {Void}
  */
  var errorRes = function (res, code, data) {
    res.status(code).json(error(data));
  };

  /**
  * @param  {Object} res instance of response
  * @param  {Object} code response cod status
  * @param  {Object} response message
  * send success response to user
  * @return {Void}
  */
  var successRes = function (res, code, data) {
    res.status(code).json(success(data));
  };

  /**
  * send customised error response
  * @return {Object} customised user error message
  */
  function customError() {
    return {
      error: 'check manual for required params'
    };
  }

  /**
  * @param  {Object} error object
  * send error response
  * @return {Object} user error message
  */
  function error(err) {
    if(err === 'default'){
      return customError();
    }

    return {
      error: err.message || err.errors[0].message
    };
  }

  /**
  * @param  {Object} error object
  * send success response
  * @return {Object} user success message
  */
  function success(data) {
    return {
      role: data
    };
  }

  // Function to be called
  return {
    response: response,
    errorRes: errorRes,
    successRes: successRes
  };

})();