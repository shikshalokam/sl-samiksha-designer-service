const draftECMHelper = require(ROOT_PATH + "/module/draftECM/helper");
const sectionsHelper = require(ROOT_PATH + "/module/draftSections/helper");
const questionsHelper = require(ROOT_PATH + "/module/draftQuestions/helper");
const criteriasHelper = require(ROOT_PATH + "/module/draftCriteria/helper");
let samikshaService = require(ROOT_PATH + "/generics/helpers/samiksha");


module.exports = class draftFrameworksHelper {

    static create(frameworkData, userId) {
        return new Promise(async (resolve, reject) => {
            try {

                let frameworkDocument;

                if (!_.isEmpty(frameworkData)) {
                    let queryObject = {
                        externalId: frameworkData.externalId,
                        name: frameworkData.name,
                        description: frameworkData.description
                    };

                    frameworkDocument = await database.models.draftFrameworks.findOne(queryObject, { _id: 1 }).lean()

                    if (frameworkDocument) {
                        throw "Framework already exists"
                    }
                }


                frameworkData["userId"] = userId

                frameworkDocument = await database.models.draftFrameworks.create(frameworkData)

                let draftECMData = {
                    "draftFrameworkId": frameworkDocument._id,
                    "externalId": "DEFAULT",
                    "tip": "default tip",
                    "name": "default name",
                    "description": "default description",
                    "startTime": "",
                    "endTime": "",
                    "isSubmitted": false,
                    "modeOfCollection": "default",
                    "canBeNotApplicable": false,
                    "userId": userId
                }

                await draftECMHelper.create(draftECMData)

                await sectionsHelper.create({
                    "draftFrameworkId": frameworkDocument._id,
                    code: "DEFAULT",
                    name: "default",
                    "userId": userId
                })

                return resolve(frameworkDocument);
            } catch (error) {
                return reject(error)
            }
        })
    }

    static update(findQuery, updateData) {
        return new Promise(async (resolve, reject) => {
            try {

                let frameworkDocument = await database.models.draftFrameworks.findOne(findQuery, { _id: 1 }).lean()

                if (!frameworkDocument) {
                    throw {
                        status: 404,
                        message: "Framework doesnot exist"
                    }
                }

                frameworkDocument = await database.models.draftFrameworks.findOneAndUpdate({
                    _id: frameworkDocument._id
                }, { $set: updateData }, { new: true }).lean()

                return resolve(frameworkDocument);
            } catch (error) {
                reject(error)
            }
        })
    }

    static list(filteredData, pageSize, pageNo) {
        return new Promise(async (resolve, reject) => {
            try {

                let draftFrameworkDocument = []

                let projection1 = {}
                projection1["$project"] = {
                    _id: 1,
                    externalId: 1,
                    name: 1,
                    description: 1
                };

                let facetQuery = {}
                facetQuery["$facet"] = {}

                facetQuery["$facet"]["totalCount"] = [
                    { "$count": "count" }
                ]

                facetQuery["$facet"]["data"] = [
                    { $skip: pageSize * (pageNo - 1) },
                    { $limit: pageSize }
                ]

                let projection2 = {}
                projection2["$project"] = {
                    "data": 1,
                    "count": {
                        $arrayElemAt: ["$totalCount.count", 0]
                    }
                }

                draftFrameworkDocument.push(filteredData, projection1, facetQuery, projection2)

                let draftFrameworkDocuments = await database.models.draftFrameworks.aggregate(draftFrameworkDocument)

                return resolve(draftFrameworkDocuments)

            } catch (error) {
                return reject(error);
            }
        })
    }

    static draftFrameworksDocument(findQuery = "all", projection = "all") {
        return new Promise(async (resolve, reject) => {
            try {

                let filteredData = {};

                if( findQuery !== "all" ) {
                    filteredData = findQuery;
                }

                let projectedData = {};

                if( projection !== "all" ) {
                    projectedData = projection;
                }
                let draftFrameworkDocuments = await database.models.draftFrameworks.find(
                    filteredData,
                    projectedData
                ).lean()

                return resolve(draftFrameworkDocuments);
            } catch (error) {
                reject(error)
            }
        })
    }

     /**
    * Validate draft framework.
    * @method
    * @name validate
    * @param {Object} filteredData  
    * @param {String} filteredData.userId - logged in user id.
    * @param {String} filteredData.status - status of draft framework.
    * @param {String} filteredData._id - draft framework id.
    * @returns {Object} draft framework validation status.
    */

    static validate(filteredData) {
        return new Promise(async (resolve, reject) => {
            try {

                let draftFrameworkDocuments = 
                await this.draftFrameworksDocument(filteredData,{
                    _id : 1,
                    externalId :1
                });

                if( !draftFrameworkDocuments[0]) {
                    throw {
                        message : 
                        messageConstants.apiResponses.DRAFT_FRAMEWORK_NOT_FOUND
                    }
                } 

                let uniqueDraftFramework = 
                await this.draftFrameworksDocument({
                    externalId : draftFrameworkDocuments[0].externalId
                },{
                    _id : 1
                });

                if( uniqueDraftFramework.length > 1 ) {
                    throw {
                        message : 
                        messageConstants.apiResponses.UNIQUE_DRAFT_FRAMEWORK_EXTERNAL_ID
                    }
                }

                let validate = true;

                return resolve(validate);

            } catch (error) {
                return reject(error);
            }
        })
    }

     /**
    * Publish draft framework.
    * @method
    * @name publish
    * @param {Object} frameworkData  
    * @param {String} frameworkData.userId - logged in user id.
    * @param {String} filteredData._id - draft framework id.
    * @returns {Object} 
    */

   static publish( draftFrameworkId, loggedInUser,token,entityType ) {
    return new Promise(async (resolve, reject) => {
        try {
          
            let frameworkData = {
                userId : loggedInUser,
                status : messageConstants.apiResponses.REVIEW_STATUS
            }

            let draftFrameworkDocuments = await this.draftFrameworksDocument(
                {
                    userId : frameworkData.userId,
                    status : frameworkData.status,
                    _id : draftFrameworkId
                }
            );

            if( !draftFrameworkDocuments[0]) {
                throw {
                    message : 
                    messageConstants.apiResponses.DRAFT_FRAMEWORK_NOT_FOUND
                }
            }
            
            frameworkData["draftFrameworkId"] = draftFrameworkDocuments[0]._id;

            let publishedDraftEcm = 
            await draftECMHelper.publish(frameworkData);

            let publishedDraftSections = 
            await sectionsHelper.publish(frameworkData);

            let publishCriteria = 
            await criteriasHelper.publish(
                frameworkData,
                token,
                loggedInUser
            );

            let publishedFramework = await _publishFramework(
                publishCriteria.criterias,
                draftFrameworkDocuments[0],
                token,
                loggedInUser
            );

            let publishSolutions = 
            await samikshaService.importObservationSolutionsFromFramework(
                token,
                publishedFramework.externalId,
                entityType ? entityType : "school" 
            );

            let solutionExternalId = 
            draftFrameworkDocuments[0].externalId+"-OBSERVATION-TEMPLATE";

            if(publishSolutions.result) {
                await samikshaService.solutionUpdate(token,{
                    evidenceMethods : publishedDraftEcm.evidencesMethod,
                    sections : publishedDraftSections.sections
                },
                solutionExternalId
                );
            }

            let publishedDraftQuestions = 
            await questionsHelper.publish(
                 frameworkData,
                 publishedDraftEcm.ecmInternalIdsToExternalIds,
                 publishedDraftSections.sectionInternalIdsToExternalIds,
                 token,
                 publishCriteria.draftCriteriaInternalToExternalId
            );

            return resolve({
                questions : publishedDraftQuestions.questions,
                framework : publishedFramework,
                solutions : {
                    _id : publishSolutions.result,
                    externalId : solutionExternalId
                }
            });

        } catch (error) {
            return reject(error);
        }
    })
}
    
}

  /**
    * Internal helper functionality to publish draft framework.
    * @method
    * @name _publishFramework
    * @param {Array} criterias - array of criteria ids  
    * @param {Object} frameworkDocuments - draft framework document.
    * @param {String} token - Logged in user token.
    * @param {String} userId - Logged in user id.
    * @returns {Object} 
    */

function _publishFramework(criterias,frameworkDocuments,token,userId) {
    return new Promise(async (resolve, reject) => {
        try {

            frameworkDocuments.themes[0].criteria = criterias;
            frameworkDocuments["createdBy"] = userId;

            /* TODO -> Dirty fix 
             Frameworks criteria should be array of object id but instead stored
             as array of string.
            */ 

            let frameworkCreation = 
            await samikshaService.createFramework(
                token,
                _.omit(frameworkDocuments,["status","comments","userId","__v","_id"])
            );

            if(frameworkCreation._id) {
                await database.models.draftFrameworks.findOneAndUpdate({
                    _id : frameworkDocuments._id
                },{
                    $set : {
                        status : "published"
                    }
                })

                return resolve({
                    externalId : frameworkCreation.externalId,
                    _id : frameworkCreation._id
                })
            } else {
                throw "Could not create framework"
            }

        } catch(error) {
            return reject(error);
        }
    })
}
