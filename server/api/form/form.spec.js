'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/forms', function() {
  it('should respond with form definition', function(done) {
    request(app)
      .get('/api/forms/formName')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });
});
