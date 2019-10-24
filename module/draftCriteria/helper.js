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
}