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
}