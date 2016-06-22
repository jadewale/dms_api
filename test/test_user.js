'use strict';
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
var faker =  require('faker');
var token1 = '';
var token2 = '';

var nameObj = {
  username: faker.internet.userName(),
  password: faker.internet.password(),
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  email: faker.internet.email(),
  role: 'Administrator'
};


chai.use(chaiHttp);

describe('users', function() {
  it('should create a new user on /users POST', function(done) {

  chai.request(server)
    .post('/users/')
    .send({'username':'Tope', 'password':'Tope',
      'firstName':'tope', 'lastName':'Fowotade',
      'email':'tope@yahoo.com','role':'Administrator'})
    .end(function(err, res){
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('token');
      token1 = res.body.token;
      res.body.message.should.equal('user created');

      console.log(Faker.name.firstName());
      done();
    });
});
 it('should fail because visitor role is not defined on /users POST', function (done) {
    chai.request(server)
    .post('/users/')
    .send({'username':'Joliphizzle', 'password':'Jolaade',
      'firstName':'Jolaade', 'lastName':'Adewale',
      'email':'jbadewale@yahoo.com', 'role':'visitor'})
    .end(function(err, res){
      res.should.have.status(409);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('error');
      res.body.error.should.equal('undefined role');
      done();
    });
  });

  it('should add user to system with a defined role', function (done) {
    chai.request(server)
    .post('/users/')
    .send({'username':'Joliphizzle', 'password':'Jolaade',
      'firstName':'Jolaade', 'lastName':'Adewale',
      'email':'jbadewale@yahoo.com', 'role':'Guest'})
    .end(function(err, res){
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('token');
      token2 = res.body.token;
      res.body.message.should.equal('user created');
      done();
    });

  });
  it('should fail because token not provided /users/ GET', function (done) {
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
  });
});


