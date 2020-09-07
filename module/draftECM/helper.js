
/**
 * name : module/helper.js
 * author : Rakesh Kumar
 * Date : 05-Sep-2020
 * Description : Draft ecm related information.
 */

module.exports = class draftECMHelper {

    /**
    * To create draft ecm
    * @method
    * @name  create
    * @param {Object} draftECMData - ecm information.
    * @param {String} draftECMData.name - name of the ecm.
    * @param {String} draftECMData.description - description of ecm.
    * @param {String} draftECMData.draftFrameworkId - draft frameworkId.
    * @returns {json} Response consists of ecm details
    */
    static create(draftECMData) {
        return new Promise(async (resolve, reject) => {
            try {
                let draftECMDocument = await database.models.draftECM.create(draftECMData)
                return resolve(draftECMDocument)
            } catch (error) {
                return reject(error)
            }
        })
    }


    /**
    * To update draft ecm
    * @method
    * @name  update
    * @param {Object} findQuery - query information.
    * @param {String} updateData.name - name of the criteria.
    * @param {String} updateData.description - description of criteria.
    * @returns {json} Response consists of ecm details
    */
    static update(findQuery, updateData) {
        return new Promise(async (resolve, reject) => {
            try {

                let draftEcmDocument = await database.models.draftECM.findOne(findQuery, { _id: 1 }).lean()

                if (!draftEcmDocument) {
                    throw {
                        status: HTTP_STATUS_CODE["not_found"].status,
                        message: CONSTANTS.apiResponses.DRAFT_ECM_NOT_FOUND
                    }
                }

                draftEcmDocument = await database.models.draftECM.findOneAndUpdate({
                    _id: draftEcmDocument._id
                }, { $set: updateData }, { new: true }).lean()

                return resolve(draftEcmDocument);
            } catch (error) {
                reject(error)
            }
        })
    }

    /**
    * To get all ecm's list
    * @method
    * @name  list
    * @param {Object} filteredData - query information.
    * @param {String} pageSize - page size of the request.
    * @param {String} pageNo - page number of the request.
    * @returns {json} Response consists of ecm's list
    */
    static list(filteredData, pageSize, pageNo) {
        return new Promise(async (resolve, reject) => {
            try {

                let draftEcmDocument = []

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

                draftEcmDocument.push(filteredData, projection1, facetQuery, projection2)

                let draftEcmDocuments = await database.models.draftECM.aggregate(draftEcmDocument)

                return resolve(draftEcmDocuments)

            } catch (error) {
                return reject(error);
            }
        })
    }
}