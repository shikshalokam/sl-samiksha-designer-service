const draftECMHelper = require(ROOT_PATH + "/module/draftECM/helper");
const sectionsHelper = require(ROOT_PATH + "/module/draftSections/helper");
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
}