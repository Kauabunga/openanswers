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


  // TODO use this instead of templateSetId for more general identifier
  templateSetObj: {
    name: String,
    version: String
  },
  templateSetId: ObjectId,
  templateSet: {},


  // TODO set directive data source to this type
  dataType: String,
  dataVersion: String,


  defaultStep: String,
  steps: [{
    name: String,
    formlyElements: [{
      key: String,
      type: { type: String },
      defaultValue: {},
      templateOptions: {}
    }]
  }]
});

var FormDefinitionModel = mongoose.model('FormDefinition', FormDefinitionSchema);

Promise.promisifyAll(FormDefinitionModel);
Promise.promisifyAll(FormDefinitionModel.prototype);

module.exports = FormDefinitionModel;
