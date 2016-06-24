module.exports = (function (){
  'use strict';

  var validDocCreation = function (req){
    var valid = true,
      id = req.body.id,
      title = req.body.title,
      content = req.body.content;

    if(!(validDocId(id))) {
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

  var roleUpdate = function (req) {
    var updates = [];
    updates[0] = parseDocsUpdate(req);
    updates[1] = {$push: {acess: req.body.role}};

    return updates;
  };

  var parseDoc = function (req) {
    return {
      'ownerId' : req.body.id,
      'title' : req.body.title,
      'content' : req.body.content,
      'createdAt' : new Date(),
      'modifiedAt' : new Date()
    };
  };

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

  function parseToNumber(num) {
    return parseInt(num, 10);
  }

  var paginate = function (req) {
    if(req.query.limit) {
      return parseToNumber(req.query.limit);
    }
    if(req.query.skip) {
      return parseToNumber(req.query.skip);
    }

    return 0;
  };

  function validData(data){
    return (data)? (/([\d+\W+])+/gi.test(data)) ? false: true : false;
  }

  function validDocId(data){
    return (data)? (/([\d+])+/g.test(data)) ? true: false : false;
  }

  return {
    validDocCreation : validDocCreation,
    parseDoc : parseDoc,
    validData : validData,
    parseDocsUpdate : parseDocsUpdate,
    validDocId : validDocId,
    getQueryDocs : getQueryDocs,
    paginate : paginate,
    roleUpdate : roleUpdate,
  };

})();
