/**
 * name : helpers/draftValidation.js
 * author : Aman
 * created-date : 21-Jan-2020
 * Description : Validate draft framework,ecm,criteria,section,question helpers functionality.
 */

 // Dependencies
const draftECMHelper = require(ROOT_PATH + "/module/draftECM/helper");
const draftSectionsHelper = require(ROOT_PATH + "/module/draftSections/helper");
const draftFrameworksHelper = require(ROOT_PATH + "/module/draftFrameworks/helper");
const draftCriteriaHelper = require(ROOT_PATH + "/module/draftCriteria/helper");
const draftQuestionsHelper = require(ROOT_PATH + "/module/draftQuestions/helper");

module.exports = class DraftValidationHelper {

     /**
    * Validate draftFramework,draftSections,draftCriteria,draftEcm,draftQuestion.
    * @method
    * @name validate
    * @param {Object} requestData  
    * @param {String} requestData.userDetails.id - logged in user id.
    * @param {Object} requestData.query - query can be any one of the following:
    * draftFrameworkId,draftEcmId,draftSectionId,draftCriteriaId,draftQuestionId
    * @returns {Object} validation status.
    */

    static validate(requestData) {
        return new Promise(async (resolve, reject) => {
            try {

                let findRequestedData = {
                    userId : requestData.userDetails.id,
                    status : messageConstants.apiResponses.DRAFT_STATUS
                };

                let responseMessage;

                if( requestData.query.draftFrameworkId ) {
                    findRequestedData["_id"] = requestData.query.draftFrameworkId;
                    
                    responseMessage = 
                    await draftFrameworksHelper.validate(findRequestedData);
                
                } else if( requestData.query.draftEcmId ) {
                    findRequestedData["_id"] = requestData.query.draftEcmId;
                    
                    responseMessage = 
                    await draftECMHelper.validate(findRequestedData);
                } else if( requestData.query.draftSectionId ) {
                    findRequestedData["_id"] = requestData.query.draftSectionId;
                    
                    responseMessage = 
                    await draftSectionsHelper.validate(findRequestedData);
                } else if( requestData.query.draftCriteriaId ) {
                    findRequestedData["_id"] = requestData.query.draftCriteriaId;

                    responseMessage = 
                    await draftCriteriaHelper.validate(findRequestedData);
                } else if( requestData.query.draftQuestionId ) {
                    findRequestedData["_id"] = requestData.query.draftQuestionId;

                    responseMessage = 
                    await draftQuestionsHelper.validate(findRequestedData);
                } else {
                    throw messageConstants.apiResponses.REQUIRED_ID_FOR_DRAFT_VALIDATION;
                }

                return resolve(responseMessage);

            } catch (error) {
                return reject(error);
            }
        })
    }
}