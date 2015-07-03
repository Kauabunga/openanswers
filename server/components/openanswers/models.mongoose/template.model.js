'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

/* global -Promise */
var Promise = require('bluebird');



var TemplateSchema = new Schema({
  name: String,
  dateCreated: Date,
  version: String,

  templateTransformationScript: String,
  templateStyleCSS: String,

  formlyType: {
    name: String,
    // TODO interesting case here where we need to validate that the template set contains the appropriate types
    //      or throw an informative error message about the template set configuration
    //      Also highlights importance of 'namespacing' type names e.g. "material-input" rather than "input"
    extends: String,
    template: String,
    defaultOptions: {}
  }

});

var TemplateModel = mongoose.model('Template', TemplateSchema);

Promise.promisifyAll(TemplateModel);
Promise.promisifyAll(TemplateModel.prototype);

module.exports = TemplateModel;
