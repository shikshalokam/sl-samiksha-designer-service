
/**
 * name : module/helper.js
 * author : Rakesh Kumar
 * Date : 05-Sep-2020
 * Description : Draft framework related information.
 */

const draftECMHelper = require(MODULES_BASE_PATH + "/draftECM/helper");
const sectionsHelper = require(MODULES_BASE_PATH + "/draftSections/helper");
module.exports = class draftFrameworksHelper {

    /**
    * To create draft framework
    * @method
    * @name  create
    * @param {Object} frameworkData - framework information.
    * @param {String} frameworkData.name - name of the framework.
    * @param {String} frameworkData.description - description of the framework.
    * @param {String} frameworkData.externalId - externalId of the framework.
    * @param {String} userId - keyclock used id.
    * @returns {json} Response consists of framework details
    */
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
                        throw CONSTANTS.apiResponses.FRAMEWORK_EXISTS;
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

    /**
    * To update draft framework
    * @method
    * @name  update
    * @param {Object} findQuery - query details.
    * @param {Object} updateData - framework information.
    * @param {String} updateData.name - name of the framework.
    * @param {String} updateData.description - description of the framework.
    * @param {String} updateData.externalId - externalId of the framework.
   * @returns {json} Response consists of framework details
    */
    static update(findQuery, updateData) {
        return new Promise(async (resolve, reject) => {
            try {

                let frameworkDocument = await database.models.draftFrameworks.findOne(findQuery, { _id: 1 }).lean()

                if (!frameworkDocument) {
                    throw {
                        status: HTTP_STATUS_CODE["not_found"].status,
                        message: CONSTANTS.apiResponses.FRAMEWORK_NOT_FOUND
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

    /**
    * To list draft framework's
    * @method
    * @name  list
    * @param {Object} filteredData - query details.
    * @param {String} pageSize - page size.
    * @param {String} pageNo - page number.
   * @returns {json} Response consists list of framework's
    */
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
}