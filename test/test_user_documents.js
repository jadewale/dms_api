'use strict';
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
var expect = chai.expect;
var id = '';
var docId = '';
var secondDoc = '';



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
      docId = res.body.document._id;
      res.body.status.should.equal('document saved');
      res.body.document.should.have.property('createdAt');
      done();
    });
  });
});

   it('should create a new document', function(done) {
     chai.request(server)
    .post('/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res){
    id = res.body.data._id;
    chai.request(server)
    .post('/documents/?token='+res.body.token)
    .send({'title':'Test mischief', 'id' : res.body.data._id, 'content' :
      'This is javacsript'})
    .end(function(err, res){
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('document');
      docId = res.body.document._id;
      res.body.status.should.equal('document saved');
      res.body.document.should.have.property('createdAt');
      done();
    });
  });
});

   it('should create a new document', function(done) {
     chai.request(server)
    .post('/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res){
    id = res.body.data._id;
    chai.request(server)
    .post('/documents/?token='+res.body.token)
    .send({'title':'Tester', 'id' : res.body.data._id, 'content' :
      'This is javacsript'})
    .end(function(err, res){
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('document');
      docId = res.body.document._id;
      res.body.status.should.equal('document saved');
      res.body.document.should.have.property('createdAt');
      done();
    });
  });
});

    it('should create a new document', function(done) {
     chai.request(server)
    .post('/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res){
    id = res.body.data._id;
    chai.request(server)
    .post('/documents/?token='+res.body.token)
    .send({'title':'Tested', 'id' : res.body.data._id, 'content' :
      'This is javacsript'})
    .end(function(err, res){
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('document');
      docId = res.body.document._id;
      res.body.status.should.equal('document saved');
      res.body.document.should.have.property('createdAt');
      done();
    });
  });
});

     it('should create a new document', function(done) {
     chai.request(server)
    .post('/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res){
    id = res.body.data._id;
    chai.request(server)
    .post('/documents/?token='+res.body.token)
    .send({'title':'Try me', 'id' : res.body.data._id, 'content' :
      'This is javacsript'})
    .end(function(err, res){
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('document');
      docId = res.body.document._id;
      res.body.status.should.equal('document saved');
      res.body.document.should.have.property('createdAt');
      done();
    });
  });
});

 it('should create a new document', function(done) {
     chai.request(server)
    .post('/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res){
    id = res.body.data._id;
    chai.request(server)
    .post('/documents/?token='+res.body.token)
    .send({'title':'who', 'id' : res.body.data._id, 'content' :
      'This is javacsript'})
    .end(function(err, res){
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('document');
      docId = res.body.document._id;
      res.body.status.should.equal('document saved');
      res.body.document.should.have.property('createdAt');
      done();
    });
  });
});

 it('should create a new document', function(done) {
     chai.request(server)
    .post('/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res){
    id = res.body.data._id;
    chai.request(server)
    .post('/documents/?token='+res.body.token)
    .send({'title':'Test in not ', 'id' : res.body.data._id, 'content' :
      'This is javacsript'})
    .end(function(err, res){
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('document');
      docId = res.body.document._id;
      res.body.status.should.equal('document saved');
      res.body.document.should.have.property('createdAt');
      done();
    });
  });
});

  it('should create a new document', function(done) {
     chai.request(server)
    .post('/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res){
    id = res.body.data._id;
    chai.request(server)
    .post('/documents/?token='+res.body.token)
    .send({'title':'Javascript', 'id' : res.body.data._id, 'content' :
      'This is javacsript'})
    .end(function(err, res){
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('document');
      docId = res.body.document._id;
      res.body.status.should.equal('document saved');
      res.body.document.should.have.property('createdAt');
      done();
    });
  });
});


 it('should create a new document', function(done) {
     chai.request(server)
    .post('/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res){
    id = res.body.data._id;
    chai.request(server)
    .post('/documents/?token='+res.body.token)
    .send({'title':'Test creation', 'id' : res.body.data._id, 'content' :
      'This is javacsript'})
    .end(function(err, res){
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('document');
      docId = res.body.document._id;
      res.body.status.should.equal('document saved');
      res.body.document.should.have.property('createdAt');
      done();
    });
  });
});


  it('should create a new document', function(done) {
     chai.request(server)
    .post('/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res){
    id = res.body.data._id;
    chai.request(server)
    .post('/documents/?token='+res.body.token)
    .send({'title':'Test me now', 'id' : res.body.data._id, 'content' :
      'This is javacsript'})
    .end(function(err, res){
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('document');
      docId = res.body.document._id;
      res.body.status.should.equal('document saved');
      res.body.document.should.have.property('createdAt');
      done();
    });
  });
});

   it('should create a new document', function(done) {
     chai.request(server)
    .post('/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res){
    id = res.body.data._id;
    chai.request(server)
    .post('/documents/?token='+res.body.token)
    .send({'title':'method is here', 'id' : res.body.data._id, 'content' :
      'This is javacsript'})
    .end(function(err, res){
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('document');
      docId = res.body.document._id;
      res.body.status.should.equal('document saved');
      res.body.document.should.have.property('createdAt');
      done();
    });
  });
});


 it('should create a new document', function(done) {
     chai.request(server)
    .post('/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res){
    id = res.body.data._id;
    chai.request(server)
    .post('/documents/?token='+res.body.token)
    .send({'title':'Adeb', 'id' : res.body.data._id, 'content' :
      'This is javacsript'})
    .end(function(err, res){
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('document');
      docId = res.body.document._id;
      res.body.status.should.equal('document saved');
      res.body.document.should.have.property('createdAt');
      done();
    });
  });
});


  it('should create a new document', function(done) {
     chai.request(server)
    .post('/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res){
    id = res.body.data._id;
    chai.request(server)
    .post('/documents/?token='+res.body.token)
    .send({'title':'Testing limits', 'id' : res.body.data._id, 'content' :
      'This is javacsript'})
    .end(function(err, res){
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('document');
      docId = res.body.document._id;
      res.body.status.should.equal('document saved');
      res.body.document.should.have.property('createdAt');
      done();
    });
  });
});

it('should fail in creating document', function(done) {
     chai.request(server)
    .post('/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res){
    chai.request(server)
    .post('/documents/?token='+res.body.token)
    .send({'title':'', 'id' : res.body.data._id, 'content' :
      'This is javacsript'})
    .end(function(err, res){
      res.should.have.status(409);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('error');
      res.body.error.should.equal('check manual for params');
      done();
    });
  });
});

it('should return single document', function(done) {
     chai.request(server)
    .post('/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res){
    chai.request(server)
    .get('/documents/'+docId+'/?token='+res.body.token)
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('data');
      res.body.data.title.should.equal('Testing limits');
      done();
    });
  });
});

it('should return all documents belonging to a user', function(done) {
     chai.request(server)
    .post('/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res){
    chai.request(server)
    .get('/users/'+id+'/documents/?token='+res.body.token)
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
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
      secondDoc = res.body.data[1]._id;
      expect(res.body.data.length).to.be.below(11);
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
     expect(res.body.success.access).to.deep.equal(['Administrator','Guest']);
      done();
    });
    });
  });

  it('should update document to add only Admin access', function (done) {
    chai.request(server)
    .post('/users/login')
    .send({'username':'Tope', 'password':'Tope'})
    .end(function(err, res){
    chai.request(server)
    .put('/documents/'+secondDoc+'/?token='+res.body.token)
    .send({'role':['Administrator']})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
     expect(res.body.success.access).to.deep.equal(['Administrator']);
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
    .send({'content':'this is a very good update'})
    .end(function(err, res){
      res.should.have.status(201);
      res.should.be.json;
      res.body.doc.content.should.equal('this is a very good update');
      done();
    });
    });
  });

 it('update should fail because of invalid doc id', function (done) {
    chai.request(server)
    .post('/users/login')
    .send({'username':'Tope', 'password':'Tope'})
    .end(function(err, res){
    chai.request(server)
    .put('/documents/jolaade/?token='+res.body.token)
    .send({'content':'this is a very good update'})
    .end(function(err, res){
      res.should.have.status(409);
      res.should.be.json;
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
      expect(res.body.data.length).to.be.below(3);
      done();
    });
    });
  });

  it('returns documents accessed by Guest role', function (done) {
     chai.request(server)
    .post('/users/login')
    .send({'username':'Tope', 'password':'Tope'})
    .end(function(err, res){
    chai.request(server)
    .get('/documents/?token=' + res.body.token +
      '&role=Guest&limit=10')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      expect(res.body.data.length).to.be.below(2);
      done();
    });
    });
  });

   it('returns documents created n 24 hours', function (done) {
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
      done();
    });
  });
});

    it('returns documents created on a particular date skipping 10', function (done) {
    chai.request(server)
    .post('/users/login')
    .send({'username':'Tope', 'password':'Tope'})
    .end(function(err, res){
    chai.request(server)
    .get('/documents/?token=' + res.body.token +
      '&date=' + new Date('2016-06-24T12:00:00') + '&skip=10&limit=10')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      done();
    });
  });
});

     it('returns documents created on a particular date with offset 5',
      function (done) {
    chai.request(server)
    .post('/users/login')
    .send({'username':'Tope', 'password':'Tope'})
    .end(function(err, res){
    chai.request(server)
    .get('/documents/?token=' + res.body.token +
      '&date=' + new Date('2016-06-24T12:00:00') + '&skip=5')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      done();
    });
  });
});

   it('should delete a document', function(done) {
     chai.request(server)
    .post('/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res){
    chai.request(server)
    .delete('/documents/'+docId+'/?token='+res.body.token)
    .send({'id':res.body.data._id})
    .end(function(err, res){
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('data');
      done();
    });
  });
});
  });