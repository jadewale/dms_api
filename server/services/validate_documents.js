module.exports = (function () {
  'use strict';

  /**
  * @param  {Object} req instance of request
  * checks user sends valid date to create a document
  * @return {Boolean} true if data is valid and false otherwise
  */
  var validDocCreation = function (req){
    var valid = true,
      id = req.body.id,
      title = req.body.title,
      content = req.body.content;

    if(!(inValidDocId(id))) {
      valid = false;
    }
    if(!title) {
      valid = false;
    }
    if(!content) {
      valid = false;
    }

    return valid;
  };

  /**
  * @param  {Object} req instance of request
  * checks user sends valid date to update a document
  * @return {Boolean} true if data is valid and false otherwise
  */
  var parseDocsUpdate = function (req) {
    var title = req.body.title,
      content = req.body.content,
      objectBuilder = {};

    if(title) {
      objectBuilder.title = title;
    }
    if(content) {
      objectBuilder.content = content;
    }
    if((title) || (content)){
      objectBuilder.modifiedAt = new Date();
    }

    return objectBuilder;
  };

  /**
  * @param  {Object} req instance of request
  * checks user sends valid date to update access in a  document
  * @return {Array} index 0 is query to update other contents
  * while index 1 is the query to update access
  */
  var roleUpdate = function (req) {
    var updates = [];
    updates[0] = parseDocsUpdate(req);
    updates[1] = {$push: {acess: req.body.role}};

    return updates;
  };

  /**
  * @param  {Object} req instance of request
  * model to create a document
  * @return {Object} Document object to model in database
  */
  var parseDoc = function (req) {
    return {
      'ownerId' : req.body.id,
      'title' : req.body.title,
      'content' : req.body.content,
      'createdAt' : new Date(),
      'modifiedAt' : new Date()
    };
  };

  /**
  * @param  {Object} req instance of request
  * build query to get documents via date or role
  * @return {Object} query built
  */
  var getQueryDocs = function (req) {
    if(req.query.date) {
    var date = new Date(req.query.date);

    return {'createdAt':
              {'$gte': new Date(date.setDate(date.getDate() - 1)),
              '$lt': req.query.date }
    };
    }

    if(req.query.role) {
      return {'access' : req.query.role};
    }
    else{
      return {};
    }
  };

  /**
  * @param  {Object} req instance of request
  * converts number to integer and passes radix param
  * @return {Object} query built
  */
  function parseToNumber(num) {
    return parseInt(num, 10);
  }

  /**
  * @param  {Object} req instance of request
  * @param  {String} limit a flag to determine what statement to run
  * @return {Integer} the result of the limit or skip
  */
  var paginate = function (req, limit) {
    if((limit) && req.query.limit) {
      return parseToNumber(req.query.limit);
    }
    if((req.query.skip) && !limit) {
      return parseToNumber(req.query.skip);
    }

    return 0;
  };

  /**
  * @param  {String} data word to test
  * checks that docId contains a number
  * @return {Boolean} true if number is found and false otherwise
  */
  function inValidDocId(data){
    return (data)? (/([\d+])+/g.test(data)) ? true: false : false;
  }

  // functions to be called
  return {
    validDocCreation : validDocCreation,
    parseDoc : parseDoc,
    parseDocsUpdate : parseDocsUpdate,
    validDocId : inValidDocId,
    getQueryDocs : getQueryDocs,
    paginate : paginate,
    roleUpdate : roleUpdate,
  };

})();
