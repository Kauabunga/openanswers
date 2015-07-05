'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/forms', function() {


  it('should respond with form definition without a version', function(done) {


    setTimeout(function(){
      request(app)
        .get('/api/forms/testForm?callback=testFormCallback')
        .expect(200)
        .expect('Content-Type', 'application/javascript; charset=utf-8')
        .end(function(err, res) {
          if (err) { return done(err); }

          var script = res.text;

          //TODO will quite possibly need to stub out angular services
          var window = {
            testFormCallback: function(formDefinition, formlyTypes){
              //console.log('eval callback formDefinition', formDefinition);
              //console.log('eval callback formlyTypes', formlyTypes);

              formDefinition.should.be.instanceof(Object);
              formlyTypes.should.be.instanceof(Object);

              done();
            }
          };

          try {
            eval(script);
          }
          catch(err){
            console.log('error evaluating script', err);
          }

        });
    }, 1000);

  });

  it('should respond with form definition with a version', function(done) {

    setTimeout(function(){
      request(app)
        .get('/api/forms/testForm/1.0.0')
        .expect(200)
        .expect('Content-Type', 'application/javascript; charset=utf-8')
        .end(function(err, res) {
          if (err) {return done(err)};
          res.body.should.be.instanceof(Object);


          var script = res.text;

          //TODO will quite possibly need to stub out angular services
          var window = {
            openanswersCallback: function(formDefinition, formlyTypes){
              //console.log('eval callback formDefinition', formDefinition);
              //console.log('eval callback formlyTypes', formlyTypes);

              formDefinition.should.be.instanceof(Object);
              formlyTypes.should.be.instanceof(Object);

              done();
            }
          };

          try {
            eval(script);
          }
          catch(err){
            console.log('error evaluating script', err);
          }

        });
    }, 1000);

  });


});
