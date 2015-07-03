
/* global -Promise */
var Promise = require('bluebird');


/**
 *
 */
return module.exports = {
  compileForm: compileForm
};


/**
 *
 * @param formDefinition
 * @returns {Promise}
 */
function compileForm(formDefinition){
  return Promise(function(success, failure){

    var template = '(' + dynamicFormTemplate.toString() + ')(window);';
    console.log(template);



  });
}






function dynamicFormTemplate(window){



}


