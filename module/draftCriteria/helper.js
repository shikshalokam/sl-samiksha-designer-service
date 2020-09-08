/**
 * name : module/helper.js
 * author : Rakesh Kumar
 * Date : 05-Sep-2020
 * Description : Draft criteria related information.
 */
module.exports = class draftCriteriaHelper {


    /**
    * To create draft criteria
    * @method
    * @name  create
    * @param {Object} draftCriteriaData - contains criteria details.
    * @param {String} draftCriteriaData.name - name of the criteria.
    * @param {String} draftCriteriaData.description - description of criteria.
    * @param {String} draftCriteriaData.draftFrameworkId - draft frameworkId.
    * @returns {json} Response consists of new criteria infromation
    */
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

     /**
    * To update draft criteria
    * @method
    * @name  update
    * @param {Object} findQuery - query information.
    * @param {Object} updateData - update data.
    * @param {String} updateData.description - description of criteria.
    * @param {String} updateData.draftFrameworkId - draft frameworkId.
    * @param {String} updateData.name - name of criteria
    * @returns {json} Response consists of updated criteria details
    */
    static update(findQuery, updateData) {
        return new Promise(async (resolve, reject) => {
            try {

                let draftCriteriaDocument = await database.models.draftCriteria.findOne(findQuery, { _id: 1 }).lean()

                if (!draftCriteriaDocument) {
                    throw {
                        status: HTTP_STATUS_CODE["not_found"].status,
                        message: CONSTANTS.apiResponses.DRAFT_CRITERIAS_NOT_FOUND
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

    /**
    * To list criteria's
    * @method
    * @name  list
    * @param {Object} filteredData - query information.
    * @param {String} pageSize - page size of the request.
    * @param {String} pageNo - page number of the request.
    * @returns {json} Response consists of list of criteria's
    */
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

    /**
    * To get details draft criteria
    * @method
    * @name  details
    * @param {String} criteriaId - draft criteria id.
    * @param {String} userId - keyclock user id.
    * @returns {json} Response consists of criteria details
    */
   static details(criteriaId, userId) {
    return new Promise(async (resolve, reject) => {
        try {

            let draftCriteriaDocument = await database.models.draftCriteria.findOne({
                _id: criteriaId,
                userId: userId
              }).lean()

              if (!draftCriteriaDocument) {
                throw new Error(CONSTANTS.apiResponses.DRAFT_CRITERIAS_NOT_FOUND);
              }
      
              return resolve({
                message: CONSTANTS.apiResponses.DRAFT_CRITERIAS_FETCHED,
                result: draftCriteriaDocument,
              })

        } catch (error) {
            reject(error)
        }
    })
}
}