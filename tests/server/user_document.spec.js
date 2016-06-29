(function() {
'use strict';
var chai = require('chai'),
  chaiHttp = require('chai-http'),
  server = require('../../server'),
  supertest = require('supertest'),
  should = chai.should(),
  expect = chai.expect,
  id = '',
  docId = '',
  secondDoc = '';

chai.use(chaiHttp);
describe('documents', function() {
  it('should create a new document /documents/ POST', function(done) {
    chai.request(server)
    .post('/api/v1/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res){
      chai.request(server)
      .post('/api/v1/documents/?token='+res.body.token)
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

  it('should create a new document /documents/ POST', function(done) {
    chai.request(server)
    .post('/api/v1/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res) {
      id = res.body.data._id;
      chai.request(server)
      .post('/api/v1/documents/?token='+res.body.token)
      .send({'title':'Test mischief', 'id' : res.body.data._id, 'content' :
        'This is javacsript'})
      .end(function(err, res) {
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

  it('should create a new document /documents/ POST', function(done) {
    chai.request(server)
    .post('/api/v1/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res) {
      id = res.body.data._id;
      chai.request(server)
      .post('/api/v1/documents/?token='+res.body.token)
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

  it('should create a new document /documents/ POST', function(done) {
    chai.request(server)
    .post('/api/v1/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res){
      id = res.body.data._id;
      chai.request(server)
      .post('/api/v1/documents/?token='+res.body.token)
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

  it('should create a new document /documents/ POST', function(done) {
    chai.request(server)
    .post('/api/v1/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res){
      id = res.body.data._id;
      chai.request(server)
      .post('/api/v1/documents/?token='+res.body.token)
      .send({'title':'Try me', 'id' : res.body.data._id, 'content' :
        'This is javacsript'})
      .end(function(err, res) {
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

  it('should create a new document /documents/ POST', function(done) {
    chai.request(server)
    .post('/api/v1/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res) {
      id = res.body.data._id;
      chai.request(server)
      .post('/api/v1/documents/?token='+res.body.token)
      .send({'title':'who', 'id' : res.body.data._id, 'content' :
        'This is javacsript'})
      .end(function(err, res) {
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

  it('should create a new document /documents/ POST', function(done) {
    chai.request(server)
    .post('/api/v1/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res) {
      id = res.body.data._id;
      chai.request(server)
      .post('/api/v1/documents/?token='+res.body.token)
      .send({'title':'Test in not ', 'id' : res.body.data._id, 'content' :
        'This is javacsript'})
      .end(function(err, res) {
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

  it('should create a new document /documents/ POST', function(done) {
    chai.request(server)
    .post('/api/v1/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res){
      id = res.body.data._id;
      chai.request(server)
      .post('/api/v1/documents/?token='+res.body.token)
      .send({'title':'Javascript', 'id' : res.body.data._id, 'content' :
        'This is javacsript'})
      .end(function(err, res) {
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

  it('should create a new document /documents/ POST', function(done) {
    chai.request(server)
    .post('/api/v1/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res){
      id = res.body.data._id;
      chai.request(server)
      .post('/api/v1/documents/?token='+res.body.token)
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

  it('should create a new document /documents/ POST', function(done) {
    chai.request(server)
    .post('/api/v1/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res) {
      id = res.body.data._id;
      chai.request(server)
      .post('/api/v1/documents/?token='+res.body.token)
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

  it('should create a new document /documents/ POST', function(done) {
    chai.request(server)
    .post('/api/v1/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res) {
      id = res.body.data._id;
      chai.request(server)
      .post('/api/v1/documents/?token='+res.body.token)
      .send({'title':'method is here', 'id' : res.body.data._id, 'content' :
        'This is javacsript'})
      .end(function(err, res) {
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

  it('should create a new document /documents/ POST', function(done) {
    chai.request(server)
    .post('/api/v1/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res) {
      id = res.body.data._id;
      chai.request(server)
      .post('/api/v1/documents/?token='+res.body.token)
      .send({'title':'Adeb', 'id' : res.body.data._id, 'content' :
        'This is javacsript'})
      .end(function(err, res) {
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

  it('should create a new document /documents/ POST', function(done) {
    chai.request(server)
    .post('/api/v1/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res) {
      id = res.body.data._id;
      chai.request(server)
      .post('/api/v1/documents/?token='+res.body.token)
      .send({'title':'Testing limits', 'id' : res.body.data._id, 'content' :
        'This is javacsript'})
      .end(function(err, res) {
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

  it('should fail in creating document /documents/ POST', function(done) {
    chai.request(server)
    .post('/api/v1/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res) {
      chai.request(server)
      .post('/api/v1/documents/?token='+res.body.token)
      .send({'title':'', 'id' : res.body.data._id, 'content':
        'This is javacsript'})
      .end(function(err, res) {
        res.should.have.status(409);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.equal('check manual for params');
        done();
      });
    });
  });

  it('should return single document /documents/ GET', function(done) {
    chai.request(server)
    .post('/api/v1/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res) {
      chai.request(server)
      .get('/api/v1/documents/'+docId+'/?token='+res.body.token)
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.title.should.equal('Testing limits');
        done();
      });
    });
  });

  it('should return documents belonging to a user /users/:id/documents GET ',
    function(done) {
      chai.request(server)
      .post('/api/v1/users/login')
      .send({'username':'Joliphizzle', 'password':'Jolaade'})
      .end(function(err, res) {
        chai.request(server)
        .get('/api/v1/users/'+id+'/documents/?token='+res.body.token)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          done();
        });
      });
  });

  it('should return documents with limit /documents/ GET', function (done) {
    chai.request(server)
    .post('/api/v1/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
      .end(function(err, res) {
      chai.request(server)
      .get('/api/v1/documents/?token='+res.body.token+'&limit='+'10')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        id = res.body.data[0]._id;
        secondDoc = res.body.data[1]._id;
        expect(res.body.data.length).to.be.below(11);
        done();
      });
    });
  });

  it('should update test document /documents/ PUT', function (done) {
    chai.request(server)
    .post('/api/v1/users/login')
    .send({'username':'Tope', 'password':'Tope'})
    .end(function(err, res) {
      chai.request(server)
      .put('/api/v1/documents/'+id+'/?token='+res.body.token)
      .send({'role':['Administrator','Guest']})
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
       expect(res.body.success.access).to.deep.equal(['Administrator','Guest']);
        done();
      });
    });
  });

  it('should update document to add only Admin access /documents/:id/ PUT',
   function (done) {
    chai.request(server)
    .post('/api/v1/users/login')
    .send({'username':'Tope', 'password':'Tope'})
    .end(function(err, res) {
      chai.request(server)
      .put('/api/v1/documents/'+secondDoc+'/?token='+res.body.token)
      .send({'role':['Administrator']})
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
       expect(res.body.success.access).to.deep.equal(['Administrator']);
        done();
      });
    });
  });

  it('should update test document /documents/:id/ PUT', function (done) {
    chai.request(server)
    .post('/api/v1/users/login')
    .send({'username':'Tope', 'password':'Tope'})
    .end(function(err, res) {
      chai.request(server)
      .put('/api/v1/documents/'+id+'/?token='+res.body.token)
      .send({'content':'this is a very good update'})
      .end(function(err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.doc.content.should.equal('this is a very good update');
        done();
      });
    });
  });

  it('update should fail because of invalid doc id /documents/:id/ PUT',
    function (done) {
      chai.request(server)
      .post('/api/v1/users/login')
      .send({'username':'Tope', 'password':'Tope'})
      .end(function(err, res) {
      chai.request(server)
      .put('/api/v1/documents/jolaade/?token='+res.body.token)
      .send({'content':'this is a very good update'})
      .end(function(err, res) {
        res.should.have.status(409);
        res.should.be.json;
        done();
      });
    });
  });

  it('returns documents accessed by defined role /documents/ GET',
    function (done) {
      chai.request(server)
      .post('/api/v1/users/login')
      .send({'username':'Tope', 'password':'Tope'})
      .end(function(err, res) {
        chai.request(server)
        .get('/api/v1/documents/?token=' + res.body.token +
          '&role=' + res.body.data.role + '&limit=10')
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          expect(res.body.data.length).to.equal(2);
          done();
       });
    });
  });

  it('returns documents accessed by Guest role /documents/ GET',
   function (done) {
    chai.request(server)
    .post('/api/v1/users/login')
    .send({'username':'Tope', 'password':'Tope'})
    .end(function(err, res) {
      chai.request(server)
      .get('/api/v1/documents/?token=' + res.body.token +
        '&role=Guest&limit=10')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        expect(res.body.data.length).to.be.below(2);
        done();
      });
    });
  });

  it('returns documents created in 24 hours /documents/ GET', function (done) {
    chai.request(server)
    .post('/api/v1/users/login')
    .send({'username':'Tope', 'password':'Tope'})
    .end(function(err, res) {
      chai.request(server)
      .get('/api/v1/documents/?token=' + res.body.token +
        '&date=' + new Date() + '&limit=10')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        expect(res.body.data.length).to.equal(10);
        done();
      });
    });
  });

  it('returns documents created on a  date skipping 10 /documents/ GET',
    function (done) {
      chai.request(server)
      .post('/api/v1/users/login')
      .send({'username':'Tope', 'password':'Tope'})
      .end(function(err, res) {
      chai.request(server)
      .get('/api/v1/documents/?token=' + res.body.token +
        '&date=' + new Date('2016-06-29T23:00:00') + '&skip=10&limit=10')
      .end(function(err, res) {
        res.should.have.status(200);
        expect(res.body.data.length).to.equal(3);
        res.should.be.json;
        done();
      });
    });
  });

  it('returns documents created on a particular date with offset 5',
    function (done) {
      chai.request(server)
      .post('/api/v1/users/login')
      .send({'username':'Tope', 'password':'Tope'})
      .end(function(err, res) {
      chai.request(server)
      .get('/api/v1/documents/?token=' + res.body.token +
        '&skip=5&date='+ new Date('2016-06-29T23:00:00'))
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        expect(res.body.data.length).to.equal(8);
        done();
      });
    });
  });

  it('should delete a document', function(done) {
    chai.request(server)
    .post('/api/v1/users/login')
    .send({'username':'Joliphizzle', 'password':'Jolaade'})
    .end(function(err, res) {
      chai.request(server)
      .delete('/api/v1/documents/'+docId+'/?token='+res.body.token)
      .send({'id':res.body.data._id})
      .end(function(err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
    });
  });

});

}());
