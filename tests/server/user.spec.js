(function() {
'use strict';

var token1 = '';
var token2 = '';
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../server');
var should = chai.should();
var faker =  require('faker');
var invalid = {
  username: faker.internet.userName(),
  password: faker.internet.password(),
  email: faker.internet.email(),
  role: 'Administrator'
};

chai.use(chaiHttp);
describe('users', function() {
  it('should create a new user on /users/ POST', function(done) {
    chai.request(server).post('/api/v1/users/')
        .send({'username':'Tope', 'password':'Tope',
          'firstName':'tope', 'lastName':'Fowotade',
          'email':'tope@yahoo.com','role':'Administrator'})
        .end(function(err, res) {
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('user created');
      done();
    });
  });

  it('should create another user on /users/ POST', function(done) {
    chai.request(server)
    .post('/api/v1/users/')
    .send({'username':'Test', 'password':'Test',
      'firstName':'test', 'lastName':'test',
      'email':'test@yahoo.com','role':'Administrator'})
    .end(function(err, res){
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('user created');
      done();
    });
  });

  it('should reject new user because of invalid data /users/ POST',
    function(done) {
      chai.request(server)
        .post('/api/v1/users/')
        .send({'username':'009898', 'password':'Test',
          'firstName':'89898', 'lastName':'test',
          'email':'87t8t8','role':'Administrator'})
        .end(function(err, res) {
          res.should.have.status(409);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('check manual for required params');
          done();
        });
  });

  it('should reject user with incomplete names /users/ POST', function(done) {
  chai.request(server)
    .post('/api/v1/users/')
    .send(invalid)
    .end(function(err, res){
      res.should.have.status(409);
      res.should.be.json;
      res.body.error.should.equal('check manual for required params');
      done();
    });
 });

 it('should fail because visitor role is not defined on /users/ POST',
  function (done) {
    chai.request(server)
    .post('/api/v1/users/')
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

  it('should add user to system with a defined role /users/ POST',
    function (done) {
      chai.request(server)
      .post('/api/v1/users/')
      .send({'username':'Joliphizzle', 'password':'Jolaade',
        'firstName':'Jolaade', 'lastName':'Adewale',
        'email':'jbadewale@yahoo.com', 'role':'Guest'})
      .end(function(err, res){
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('user created');
        done();
      });
  });

  it('should fail because token not provided /users/ GET', function (done) {
    chai.request(server)
    .get('/api/v1/users/')
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
    .post('/api/v1/users/login')
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

  it('should return invalid username or password /users/login/ POST',
    function (done) {
      chai.request(server)
      .post('/api/v1/users/login')
      .send({'username':'Joliphizzle', 'password':'invalidpassword'})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.equal('Invalid username or password');
        done();
      });
  });

  it('should return all users /users/ GET', function (done) {
    chai.request(server)
    .get('/api/v1/users/?token='+token1)
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      done();
    });
  });

  it('should return user /users/:id/ GET', function(done) {
    chai.request(server).post('/api/v1/users/login/')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res) {
      chai.request(server)
      .get('/api/v1/users/'+res.body.data._id+'/?token='+res.body.token)
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.should.have.property('token');
        done();
      });
    });
  });

  it('should update a users email /users/:id/ PUT', function(done) {
      chai.request(server).post('/api/v1/users/login/')
      .send({'username':'Joliphizzle', 'password':'Jolaade'})
      .end(function(err, res){
      chai.request(server)
      .put('/api/v1/users/'+res.body.data.username+'/?token='+res.body.token+
        '&email=jolly@yahoo.com')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.email.should.equal('jolly@yahoo.com');
        done();
      });
    });
  });

  it('should update a users username /users/:id/ PUT', function(done) {
      chai.request(server)
      .post('/api/v1/users/login/')
      .send({'username':'Test', 'password':'Test'})
      .end(function(err, res){
      chai.request(server)
      .put('/api/v1/users/'+res.body.data.username+'/?token='+res.body.token+
        '&newusername=Best')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.username.should.equal('Best');
        done();
      });
    });
  });

  it('should fail because you updated role /users/:id/ PUT', function(done) {
      chai.request(server)
      .post('/api/v1/users/login/')
      .send({'username':'Best', 'password':'Test'})
      .end(function(err, res){
      chai.request(server)
      .put('/api/v1/users/'+res.body.data.username+'/?token='+res.body.token+
        '&newusername=Best&role=User')
      .end(function(err, res) {
        res.should.have.status(409);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.equal('check manual for required params');
        done();
      });
    });
  });

  it('should fail because password is numbers /users/:id/ PUT', function(done) {
      chai.request(server)
      .post('/api/v1/users/login/')
      .send({'username':'Best', 'password':'Test'})
      .end(function(err, res){
      chai.request(server)
      .put('/api/v1/users/'+res.body.data.username+'/?token='+res.body.token+
        '&password='+'849493939')
      .end(function(err, res) {
        res.should.have.status(409);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.equal('check manual for required params');
        done();
      });
    });
  });

  it('should fail because name is numbers /users/:id/ PUT', function(done) {
      chai.request(server)
      .post('/api/v1/users/login/')
      .send({'username':'Best', 'password':'Test'})
      .end(function(err, res){
      chai.request(server)
      .put('/api/v1/users/'+res.body.data.username+'/?token='+res.body.token+
        '&firstName='+'849493939')
      .end(function(err, res) {
        res.should.have.status(409);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.equal('check manual for required params');
        done();
      });
    });
  });

  it('should fail because lastname is numbers /users/:id/ PUT', function(done) {
      chai.request(server)
      .post('/api/v1/users/login/')
      .send({'username':'Best', 'password':'Test'})
      .end(function(err, res) {
        chai.request(server)
        .put('/api/v1/users/'+res.body.data.username+'/?token='+res.body.token+
          '&lastName='+' 0849 ')
        .end(function(err, res) {
          res.should.have.status(409);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('check manual for required params');
          done();
        });
      });
  });

  it('should fail on update due to invalid email a user /users/:id/ PUT',
    function(done) {
      chai.request(server)
      .post('/api/v1/users/login/')
      .send({'username':'Joliphizzle', 'password':'Jolaade'})
      .end(function(err, res){
      chai.request(server)
      .put('/api/v1/users/'+res.body.data.username+'/?token='+res.body.token+
        '&email=jollyyahoo.com')
      .end(function(err, res) {
        res.should.have.status(409);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.equal('check manual for required params');
        done();
      });
    });
  });

  it('should delete user /users/:id/ DELETE', function(done) {
    chai.request(server)
    .post('/api/v1/users/login/')
    .send({'username':'Best', 'password':'Test'})
    .end(function(err, res) {
    chai.request(server)
    .delete('/api/v1/users/'+res.body.data.username+'/?token='+res.body.token)
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('deleted');
      done();
      });
    });
  });

  it('should log a user out /users/logout/ POST',
   function(done) {
       chai.request(server)
      .post('/api/v1/users/login/')
      .send({'username':'Joliphizzle', 'password':'Jolaade'})
      .end(function(err, res){
       chai.request(server)
      .post('/api/v1/users/logout/?token='+res.body.token)
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('message');
        res.body.message.should.equal('user logged out');
        chai.request(server)
        .delete('/api/v1/users/'+invalid.username+'/')
        .end(function(err, res) {
          res.should.have.status(403);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.should.have.property('message');
          res.body.success.should.equal(false);
          res.body.message.should.equal('No token provided.');
          done();
        });
      });
    });
  });

});

}());


