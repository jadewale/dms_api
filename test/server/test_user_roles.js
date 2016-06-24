'use strict';
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
var token2 = '';

chai.use(chaiHttp);

describe('roles', function() {
  it('should create a role with unique title', function(done) {
     chai.request(server)
    .post('/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res){
    chai.request(server)
    .post('/roles/')
    .send({'title':'Test', 'token' : res.body.token})
    .end(function(err, res){
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.title.should.equal('Test');
      done();
    });
  });
});

  it('should fail because role has numbers', function(done) {
     chai.request(server)
    .post('/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res){
    chai.request(server)
    .post('/roles/')
    .send({'title':'12344', 'token' : res.body.token})
    .end(function(err, res){
      res.should.have.status(409);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('error');
      res.body.error.should.equal('check manual for required params');
      done();
    });
  });
});


  it('should fail because role has been created', function (done) {
    chai.request(server)
    .post('/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res){
    chai.request(server)
    .post('/roles/?token='+res.body.token)
    .send({'title':'Test'})
    .end(function(err, res){
      res.should.have.status(409);
      res.should.be.json;
      done();
    });
    });
  });

  it('should returns all the roles in the system', function (done) {
    chai.request(server)
    .post('/users/login')
    .send({'username':'Tope', 'password':'Tope'})
    .end(function(err, res) {
    chai.request(server)
    .get('/roles/?token='+res.body.token)
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.role[0].title.should.equal('Administrator');
      res.body.role[1].title.should.equal('User');
      res.body.role[2].title.should.equal('Guest');
      res.body.role[3].title.should.equal('Test');
      done();
    });
    });
  });
/*  it('should fail because token not provided /users/ GET', function (done) {
    chai.request(server)
    .get('/users/')
    .end(function(err, res){
      res.should.have.status(403);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.success.should.equal(false);
      res.body.message.should.equal('No token provided.');
      done();
    });
  });
  it('should log user in /users/login/ POST', function (done) {
    chai.request(server)
    .post('/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('token');
      token1 = res.body.token;
      done();
    });
  });
  it('should return all users /users/ GET', function (done) {
    chai.request(server)
    .get('/users/?token='+token1)
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      done();
    });
  }); */
});