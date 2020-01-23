let samikshaService = require(ROOT_PATH + "/generics/helpers/samiksha");
const mongoose = require("mongoose");

module.exports = class draftCriteriaHelper {
    static create(draftCriteriaData) {
        return new Promise(async (resolve, reject) => {
            try {
                let draftCriteriaDocument = await database.models.draftCriteria.create(draftCriteriaData)
                return resolve(draftCriteriaDocument)
            } catch (error) {
                return reject(error)
            }
        })
    }

    static update(findQuery, updateData) {
        return new Promise(async (resolve, reject) => {
            try {

                let draftCriteriaDocument = await database.models.draftCriteria.findOne(findQuery, { _id: 1 }).lean()

                if (!draftCriteriaDocument) {
                    throw {
                        status: 404,
                        message: "Draft Criteria doesnot exist"
                    }
                }

                draftCriteriaDocument = await database.models.draftCriteria.findOneAndUpdate({
                    _id: draftCriteriaDocument._id
                }, { $set: updateData }, { new: true }).lean()

                return resolve(draftCriteriaDocument);
            } catch (error) {
                reject(error)
            }
        })
    }

    static list(filteredData, pageSize, pageNo) {
        return new Promise(async (resolve, reject) => {
            try {

                let draftCriteriaDocument = []

                let projection1 = {}
                projection1["$project"] = {
                    _id: 1, code: 1, name: 1, description: 1
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

                draftCriteriaDocument.push(filteredData, projection1, facetQuery, projection2)

                let draftCriteriaDocuments = await database.models.draftCriteria.aggregate(draftCriteriaDocument)

                return resolve(draftCriteriaDocuments)

            } catch (error) {
                return reject(error);
            }
        })
    }

    static draftCriteriaDocument(findQuery = "all", projection = "all") {
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
                let draftCriteriaDocuments = await database.models.draftCriteria.find(
                    filteredData,
                    projectedData
                ).lean();

                return resolve(draftCriteriaDocuments);
            } catch (error) {
                reject(error);
            }
        })
    }

    /**
    * Validate draft criteria.
    * @method
    * @name validate
    * @param {Object} filteredData  
    * @param {String} filteredData.userId - logged in user id.
    * @param {String} filteredData.status - status of draft criteria.
    * @param {String} filteredData._id - draft criteria id.
    * @returns {Object} draft criteria validation status.
    */

    static validate(filteredData) {
        return new Promise(async (resolve, reject) => {
            try {

                let draftCriteriaDocuments = 
                await this.draftCriteriaDocument(filteredData,{
                    _id : 1,
                    externalId : 1
                });

                if( !draftCriteriaDocuments[0]) {
                    throw {
                        message : 
                        messageConstants.apiResponses.DRAFT_CRITERIA_NOT_FOUND
                    };
                }
                
                let draftCriteriaUniqueDocuments = 
                await this.draftCriteriaDocument({
                    externalId : draftCriteriaDocuments[0].externalId
                },{
                    _id : 1
                });

                if( draftCriteriaUniqueDocuments.length > 1 ) {
                    throw {
                        message : 
                        messageConstants.apiResponses.UNIQUE_DRAFT_CRITERIA_EXTERNAL_ID
                    };
                }

                let validate = true;

                return resolve(validate);

            } catch (error) {
                return reject(error);
            }
        })
    }

     /**
    * Publish draft criteria.
    * @method
    * @name publish
    * @param {Object} filteredData - filtered data for getting draftCriteria id.
    * @param {String} token - logged in user token.
    * @param {String} userId - logged in user id.
    * @returns {Object} returns criterias and draftCriteriaInternalToExternalId
    */

    static publish(filteredData,token,userId) {
        return new Promise(async (resolve, reject) => {
            try {
    
                let draftCriteriaDocuments = 
                await this.draftCriteriaDocument(filteredData);
    
                if( !draftCriteriaDocuments.length > 0) {
                    throw {
                        message : 
                        messageConstants.apiResponses.DRAFT_CRITERIA_NOT_FOUND
                    };
                }

                let draftCriteriaIds = [];
                let draftCriteriaInternalToExternalId = {}

                let draftCriteriaData = [...draftCriteriaDocuments].map(draftCriteria=>{
                    draftCriteriaIds.push(draftCriteria._id);
                    draftCriteria["owner"] = userId;
                    draftCriteriaInternalToExternalId[draftCriteria._id.toString()] = 
                    draftCriteria.externalId;

                    return _.omit(
                        draftCriteria,
                      [
                        "_id","draftFrameworkId","status","comments"
                      ]
                    )
                })

                let criterias = 
                await samikshaService.createCriteria(token,draftCriteriaData);

                criterias = criterias.map(criteria=>{
                    return {
                        criteriaId : new mongoose.Types.ObjectId(criteria._id),
                        "weightage" : 0
                    }
                });

                await database.models.draftCriteria.updateMany({
                    _id : {$in : draftCriteriaIds},
                    },{
                    $set:{status : "published"}
                })

                return resolve({
                    criterias : criterias,
                    draftCriteriaInternalToExternalId : draftCriteriaInternalToExternalId
                });
    
            } catch (error) {
                return reject(error);
            }
        })
        }
}