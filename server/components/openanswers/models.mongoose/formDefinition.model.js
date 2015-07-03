'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


/* global -Promise */
var Promise = require('bluebird');



var FormDefinitionSchema = new Schema({

  name: String,
  dateCreated: Date,
  version: String,

  templateSet: ObjectId,

  defaultStep: String,
  steps: [{
    name: String,
    formlyElements: [{
      key: String,
      type: String,
      defaultValue: {},
      templateOptions: {}
    }]
  }]
});

var FormDefinitionModel = mongoose.model('FormDefinition', FormDefinitionSchema);

Promise.promisifyAll(FormDefinitionModel);
Promise.promisifyAll(FormDefinitionModel.prototype);

module.exports = FormDefinitionModel;