module.exports = class draftSectionsHelper {
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

    static update(findQuery, updateData) {
        return new Promise(async (resolve, reject) => {
            try {

                let draftSectionDocument = await database.models.draftSections.findOne(findQuery, { _id: 1 }).lean()

                if (!draftSectionDocument) {
                    throw {
                        status: 404,
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
}