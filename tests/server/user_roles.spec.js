(function() {
'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../server');
var should = chai.should();
var token2 = '';

chai.use(chaiHttp);
describe('roles', function() {
  it('should create a role with unique title /roles/ POST', function(done) {
    chai.request(server)
    .post('/api/v1/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res) {
      chai.request(server)
      .post('/api/v1/roles/')
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

  it('should fail because role has numbers /roles/ POST', function(done) {
     chai.request(server)
    .post('/api/v1/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res) {
      chai.request(server)
      .post('/api/v1/roles/')
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

  it('should fail because role has been created /roles/ POST', function (done) {
    chai.request(server)
    .post('/api/v1/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res){
      chai.request(server)
      .post('/api/v1/roles/?token='+res.body.token)
      .send({'title':'Test'})
      .end(function(err, res){
        res.should.have.status(409);
        res.should.be.json;
        done();
      });
    });
  });

  it('should returns all the roles in the system /roles/ GET', function (done) {
    chai.request(server)
    .post('/api/v1/users/login')
    .send({'username':'Tope', 'password':'Tope'})
    .end(function(err, res) {
      chai.request(server)
      .get('/api/v1/roles/?token='+res.body.token)
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

});

}());
