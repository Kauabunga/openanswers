'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

/* global -Promise */
var Promise = require('bluebird');



var TemplateSetSchema = new Schema({
  name: String,
  dateCreated: Date,
  version: String,

  templateSetTransformationScript: String,
  templateSetStyleCSS: String,


  // TODO use this instead of templateIds for more general identifier
  //    write tests for saving / getting from different params + validation
  templateObjs: [
    {
      name: String,
      version: String
    }
  ],
  templateIds: [ ObjectId ],
  templates: [{}]

});

var TemplateSetModel = mongoose.model('TemplateSet', TemplateSetSchema);

Promise.promisifyAll(TemplateSetModel);
Promise.promisifyAll(TemplateSetModel.prototype);

module.exports = TemplateSetModel;
