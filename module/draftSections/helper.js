/**
 * name : module/helper.js
 * author : Rakesh Kumar
 * Date : 05-Sep-2020
 * Description : Draft sections related information
 */

module.exports = class draftSectionsHelper {

    /**
    * To create draft section
    * @method
    * @name  create
    * @param {Object} sectionsData - section details.
    * @param {String} sectionsData.code - code of the section.
    * @param {String} sectionsData.draftFrameworkId - draftFrameworkId of the section.
    * @returns {json} Response consists of draft section details
    */
    static create(sectionsData) {
        return new Promise(async (resolve, reject) => {
            try {
                let sectionsDocument = await database.models.draftSections.create(sectionsData)
                return resolve(sectionsDocument)
            } catch (error) {
                return reject(error)
            }
        })
    }

    /**
    * To update draft section
    * @method
    * @name  update
    * @param {Object} sectionsData - section details.
    * @param {String} sectionsData.code - code of the section.
    * @param {String} sectionsData.draftFrameworkId - draftFrameworkId of the section.
    * @returns {json} Response consists of draft section details
    */
    static update(findQuery, updateData) {
        return new Promise(async (resolve, reject) => {
            try {

                let draftSectionDocument = await database.models.draftSections.findOne(findQuery, { _id: 1 }).lean()

                if (!draftSectionDocument) {
                    throw {
                        status: HTTP_STATUS_CODE["not_found"].status,
                        message: "Draft Section doesnot exist"
                    }
                }

                draftSectionDocument = await database.models.draftSections.findOneAndUpdate({
                    _id: draftSectionDocument._id
                }, { $set: updateData }, { new: true }).lean()

                return resolve(draftSectionDocument);
            } catch (error) {
                reject(error)
            }
        })
    }

    /**
    * To list draft section
    * @method
    * @name  list
    * @param {Object} filteredData - query details.
    * @param {String} pageSize - page size.
    * @param {String} pageNo - page number.
    * @returns {json} Response consists of list of section's
    */
    static list(filteredData, pageSize, pageNo) {
        return new Promise(async (resolve, reject) => {
            try {

                let draftSectionsDocument = []

                let projection1 = {}
                projection1["$project"] = {
                    _id: 1, code: 1, name: 1
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

                draftSectionsDocument.push(filteredData, projection1, facetQuery, projection2)

                let draftSectionsDocuments = await database.models.draftSections.aggregate(draftSectionsDocument)

                return resolve(draftSectionsDocuments)

            } catch (error) {
                return reject(error);
            }
        })
    }


    /**
    * To details draft section
    * @method
    * @name  details
    * @param {String} sectionId - draftt sectionId.
    * @param {String} userId - ckeyclock user details.
    * @returns {json} Response consists of draft section details
    */
   static details(sectionId, userId) {
    return new Promise(async (resolve, reject) => {
        try {

            let draftSectionDocument = await database.models.draftSections.findOne({
                _id: sectionId,
                userId: userId
              }).lean()
        
              if (!draftSectionDocument) {
                throw new Error(CONSTANTS.apiResponses.SECTION_NOT_FOUND);
              }
        
              return resolve({
                message: CONSTANTS.apiResponses.SECTION_DETAILS_FETCHED,
                result: draftSectionDocument
              })

        ;
        } catch (error) {
            reject(error)
        }
    })
}


    
}