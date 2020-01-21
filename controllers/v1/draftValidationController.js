/**
 * name : draftValidation.js
 * author : Aman
 * created-date : 21-Jan-2020
 * Description : Validate draft framework,ecm,criteria,section,question.
 */


// Dependencies.
const draftValidationHelper = require(ROOT_PATH + "/module/draftValidation/helper");

module.exports = class DraftValidation {

  /**
  * @api {get} /assessment-design/api/v1/draftValidation/validate?draftFrameworkId=:draftFrameworkId Delete framework
  * @apiVersion 1.0.0
  * @apiName Validate draft framework,ecm,criteria,section,question
  * @apiGroup Draft Validate
  * @apiSampleRequest /assessment-design/api/v1/draftValidation/validate?draftFrameworkId=5daec85d58e6e53dbdd84e0e
  * @apiUse successBody
  * @apiUse errorBody
  */

 /**
    * Validate framework. Check whether the framework is ready for publish or not.
    * @method
    * @name details
    * @param {Request} req 
    * @param {Object} req.query
    * @example req.query.draftFrameworkId
    * @example req.query.draftEcmId
    * @example req.query.draftCriteriaId
    * @example req.query.draftSectionId
    * @example req.query.draftQuestionId   
    * @param {String} req.userDetails.id - logged in user id.    
    * @returns {JSON}
  */

 async validate(req) {
  return new Promise(async (resolve, reject) => {
    try {

      let draftValidationData = await draftValidationHelper.validate(req);
      return resolve({
        result:{
          validate : draftValidationData
        }
      });
    } catch (error) {
      reject({
        status: error.status || 500,
        message: error.message || "Oops! something went wrong."
      })
    }
  })
}
}