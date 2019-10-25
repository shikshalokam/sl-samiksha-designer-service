module.exports = class draftQuestionsHelper {
  static create(draftQuestionData) {
    return new Promise(async (resolve, reject) => {
      try {
        let draftQuestionDocument = await database.models.draftQuestions.create(draftQuestionData)
        return resolve(draftQuestionDocument)
      } catch (error) {
        return reject(error)
      }
    })
  }

  static update(findQuery, updateData) {
    return new Promise(async (resolve, reject) => {
      try {

        let draftQuestionDocument = await database.models.draftQuestions.findOne(findQuery, { _id: 1 }).lean()

        if (!draftQuestionDocument) {
          throw {
            status: 404,
            message: "Draft Question doesnot exist"
          }
        }

        draftQuestionDocument = await database.models.draftQuestions.findOneAndUpdate({
          _id: draftQuestionDocument._id
        }, { $set: updateData }, { new: true }).lean()

        return resolve(draftQuestionDocument);
      } catch (error) {
        reject(error)
      }
    })
  }

  static list(filteredData, pageSize, pageNo) {
    return new Promise(async (resolve, reject) => {
      try {

        let draftQuestionDocument = []

        let projection1 = {}
        projection1["$project"] = {
          _id: 1, externalId: 1, question: 1, responseType: 1
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

        draftQuestionDocument.push(filteredData, projection1, facetQuery, projection2)

        let draftQuestionDocuments = await database.models.draftQuestions.aggregate(draftQuestionDocument)

        return resolve(draftQuestionDocuments)

      } catch (error) {
        return reject(error);
      }
    })
  }

}