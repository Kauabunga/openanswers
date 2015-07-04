
/* global -Promise */
var Promise = require('bluebird');
var format = require('string-template');
var _ = require('lodash');
var uuid = require('node-uuid');

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
function compileForm(formDefinition, callback){
  return new Promise(function(success, failure){

    try {
      var template = getDynamicBaseTemplate(dynamicFormTemplate);
      var escapedTemplate = escapeTemplate(template);

      var formattedTemplate = format(escapedTemplate, {
        callback: callback || 'openanswersCallback',
        formDefinitionStringified: getFormDefinitionStringified(formDefinition),
        transformationFunctions: getTransformationFunctionsStringified(formDefinition),
        formlyTypes: getFormlyTypes(formDefinition),
        formStyleCSS: getFormStyleCSS(formDefinition)
      });

      console.log('\nCreated dynamic form js\n\n********************************\n');
      console.log(formattedTemplate);
      console.log('\n********************************\n');

      // TODO should really be rewritting formly template names and elements as "name-version"

      return success(formattedTemplate);

    }
    catch(error){
      console.log('error compiling form');
      failure(error);
    }
  });
}


/**
 * This function gets toString()ed
 *
 * @param window
 */
function dynamicFormTemplate(window){

  // Transform functions -> prewrap with assignment to variable
  //    object with name of function as key to function
  var transformationFunctions = '@@{transformationFunctions}@@';

  return window['{callback}'](getFormDefinition(), getFormlyTemplates());

  function getFormDefinition(){
    return '@@{formDefinitionStringified}@@';
  }

  function getFormlyTemplates(){
    var templates = ['@@{formlyTypes}@@'];
    var styleSheet = '{formStyleCSS}';
    var i = 0;

    if(transformationFunctions.templateSetTransformationFunction){
      transformationFunctions.templateSetTransformationFunction(templates);
    }

    for(; i < templates.length; i++){
      var currentTemplate = templates[i];

      if(transformationFunctions[currentTemplate.name]){
        try {
          transformationFunctions[currentTemplate.name](currentTemplate);
        }
        catch(error){
          console.log('error performing transformation script', error);
        }
      }
    }

    // Attach css to dom if it hasn't been already

    return templates;
  }

}


/**
 *
 * @param formDefinition
 */
function getTransformationFunctions(formDefinition){

  var transformationFunctions = {};

  if(validateTransformationScript(formDefinition.templateSet.templateSetTransformationScript)){
    transformationFunctions.templateSetTransformationFunction = formDefinition.templateSet.templateSetTransformationScript
  }
  else if(formDefinition.templateSet.templateSetTransformationScript){
    console.log('invalid transformation script found', formDefinition.templateSet);
  }

  _.each(formDefinition.templateSet.templates, function(template){
    if(validateTransformationScript(template.templateTransformationScript)){

      if(transformationFunctions[template.name] !== undefined){
        console.log('DUPLICATE TEMPLATE NAME');
      }

      transformationFunctions[template.name] = template.templateTransformationScript;
    }
    else if(template.templateTransformationScript){
      console.log('invalid transformation script found', template);
    }
  });

  return transformationFunctions;
}

/**
 *
 * @param formDefinition
 * @returns {*}
 */
function getTransformationFunctionsStringified(formDefinition){

  var transformationFunctions = getTransformationFunctions(formDefinition);

  var transformationsBaseTemplate = {};
  var transformationsSafeIds = {};

  _.each(transformationFunctions, function(transformFunction, key){
    //need to do this because the string-template needs a safely named variable i.e. no "-" character
    var safeVarId = getSafeRandomVar();
    transformationsBaseTemplate[key] = '@@{' + safeVarId + '}@@';
    transformationsSafeIds[safeVarId] = transformationFunctions[key];
  });

  var escapedTransformations = escapeTemplate(JSON.stringify(transformationsBaseTemplate));
  var formattedTransformations = format(escapedTransformations, transformationsSafeIds);

  return formattedTransformations;
}

/**
 *
 * @param transformationScript
 * @returns {boolean}
 */
function validateTransformationScript(transformationScriptString){

  if( ! transformationScriptString ){
    return false;
  }

  if(transformationScriptString.trim().indexOf('function') !== 0){
    console.log('transformation function does not lead with a function definition', transformationScriptString);
    return false;
  }

  return true;
}

/**
 *
 * @param styleCSS
 * @returns {boolean}
 */
function validateStyleCSS(styleCSS){
  return true;
}

/**
 *
 * @param formDefinition
 */
function getFormlyTypes(formDefinition){
  return _.map(formDefinition.templateSet.templates, function(template){
    return template.formlyType;
  });
}

/**
 *
 * @param formDefinition
 */
function getFormStyleCSS(formDefinition){
  // TODO validate models scripts and css

}



/**
 *
 * @param dynamicFormTemplate
 * @returns {string}
 */
function getDynamicBaseTemplate(dynamicFormTemplate){
  return '(' + dynamicFormTemplate.toString() + ')(window);';
}

/**
 *
 * @param template
 * @returns {*}
 */
function escapeTemplate(template){
  return template.replace(/'@@/g, '').replace(/@@'/g, '')
    .replace(/@@"/g, '').replace(/"@@/g, '').replace(/\}\}/g, '} }');
}

/**
 *
 * @param formDefinition
 * @returns {*}
 */
function getFormDefinitionStringified(formDefinition){

  //Do not want to include the template set in the formDefinition
  var templateSetReference = formDefinition.templateSet;
  formDefinition.templateSet = undefined;
  var stringified = JSON.stringify(formDefinition);
  formDefinition.templateSet = templateSetReference;

  return stringified;
}

/**
 *
 * @returns {string}
 */
function getSafeRandomVar(){
  return ('alphacharacter' + uuid.v1()).replace(/-/g, '');
}



