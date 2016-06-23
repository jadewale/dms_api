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
    if(req.query.date){
      var date = new Date(req.query.date);
      return {'createdAt': {'$gte': req.query.date, '$lt':
       date.setDate(date.getDate() + 1)}};
    }
    if(req.query.role) {
      return {'access' : req.query.role};
    }
    else{
      return {};
    }
  };

  var getSkip = function (req) {
    if(req.query.skip){
      return parseInt(req.query.skip, 10);
    }

    return 0;
  };
  var getLimit = function (req) {
    if(req.query.limit) {
      return parseInt(req.query.limit, 10);
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
    getLimit : getLimit,
    roleUpdate : roleUpdate,
    getSkip: getSkip
  };

})();
