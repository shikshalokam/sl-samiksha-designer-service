module.exports = class draftECMHelper {
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

    static draftEcmDocument(findQuery = "all", projection = "all") {
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
                let draftEcmDocuments = await database.models.draftECM.find(
                    filteredData,
                    projectedData
                ).lean();

                return resolve(draftEcmDocuments);
            } catch (error) {
                reject(error);
            }
        })
    }

    static update(findQuery, updateData) {
        return new Promise(async (resolve, reject) => {
            try {

                let draftEcmDocument = await database.models.draftECM.findOne(findQuery, { _id: 1 }).lean()

                if (!draftEcmDocument) {
                    throw {
                        status: 404,
                        message: "Draft Ecm doesnot exist"
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

    /**
    * Validate draft ecm.
    * @method
    * @name validate
    * @param {Object} filteredData  
    * @param {String} filteredData.userId - logged in user id.
    * @param {String} filteredData.status - status of draft ecm.
    * @param {String} filteredData._id - draft ecm id.
    * @returns {Object} draft ecm validation status.
    */

    static validate(filteredData) {
        return new Promise(async (resolve, reject) => {
            try {

                let draftEcmDocuments = 
                await this.draftEcmDocument(filteredData,{
                    _id : 1,
                    code : 1
                });

                if( !draftEcmDocuments[0]) {
                    throw {
                        message : 
                        messageConstants.apiResponses.DRAFT_ECM_NOT_FOUND
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