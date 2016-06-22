'use strict';
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
var id = '';


chai.use(chaiHttp);

describe('documents', function() {
  it('should create a new document', function(done) {
     chai.request(server)
    .post('/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res){
    chai.request(server)
    .post('/documents/?token='+res.body.token)
    .send({'title':'Test', 'id' : res.body.data._id, 'content' :
      'This is javacsript'})
    .end(function(err, res){
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('document');
      res.body.status.should.equal('document saved');
      res.body.document.should.have.property('createdAt');
      done();
    });
  });
});
  it('should return documents with limit', function (done) {
     chai.request(server)
    .post('/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res) {
    chai.request(server)
    .get('/documents/?token='+res.body.token+'&limit='+'10')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('data');
      res.body.data.should.be.a('array');
      //console.log(res.body.data[0]._id);
      id = res.body.data[0]._id;
     // res.body.data.length.be.at.most(10);
      done();
    });
    });
  });

  it('should update test document', function (done) {
    chai.request(server)
    .post('/users/login')
    .send({'username':'Tope', 'password':'Tope'})
    .end(function(err, res){
    chai.request(server)
    .put('/documents/'+id+'/?token='+res.body.token)
    .send({'role':['Administrator','Guest']})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      console.log(res);
      //res.body.success.access.should.equal(['Administrator','Guest']);
      done();
    });
    });
  });
  it('returns documents accessed by defined role', function (done) {
     chai.request(server)
    .post('/users/login')
    .send({'username':'Tope', 'password':'Tope'})
    .end(function(err, res){
    chai.request(server)
    .get('/documents/?token=' + res.body.token +
      '&role=' + res.body.data.role + '&limit=10')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      //console.log(res);
      done();
    });
    });
  });
   it('returns documents created on a particular date', function (done) {
    chai.request(server)
    .post('/users/login')
    .send({'username':'Tope', 'password':'Tope'})
    .end(function(err, res){
    chai.request(server)
    .get('/documents/?token=' + res.body.token +
      '&date=' + new Date() + '&limit=10')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      //console.log('test');
     // console.log(res);
      done();
    });
  });
});
  });