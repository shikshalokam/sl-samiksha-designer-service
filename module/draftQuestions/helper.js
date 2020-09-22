
/**
 * name : module/helper.js
 * author : Rakesh Kumar
 * Date : 05-Sep-2020
 * Description : Draft questions informations.
 */

module.exports = class draftQuestionsHelper {

    /**
    * To create draft question
    * @method
    * @name  create
    * @param {Object} draftQuestionData - question details.
    * @param {String} draftQuestionData.externalId - externalId of the question.
    * @param {String} draftQuestionData.draftCriteriaId - draftCriteriaId of the question.
    * @param {String} draftQuestionData.questionType - type of question.
    * @param {String} draftQuestionData.questionNumber - number of the question.
    * @param {String} draftQuestionData.value - value of the question.
    * @returns {json} Response consists of draft question
    */
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

   /**
    * To update draft questions
    * @method
    * @name  update
    * @param {Object} findQuery - query details.
    * @param {Object} updateData - question details.
    * @param {String} updateData.externalId - externalId of the question.
    * @param {String} updateData.draftCriteriaId - draftCriteriaId of the question.
    * @param {String} updateData.questionType - type of question.
    * @param {String} updateData.questionNumber - number of the question.
    * @param {String} updateData.value - value of the question.
    * @returns {json} Response consists of updated question details
    */
  static update(findQuery, updateData) {
    return new Promise(async (resolve, reject) => {
      try {

        let draftQuestionDocument = await database.models.draftQuestions.findOne(findQuery, { _id: 1 }).lean()

        if (!draftQuestionDocument) {
          throw {
            status: HTTP_STATUS_CODE["not_found"].status,
            message: CONSTANTS.apiResponses.DRAFT_QUESTION_NOT_FOUND
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

    /**
    * To list draft questions
    * @method
    * @name  list
    * @param {Object} filteredData - query details.
    * @param {String} pageSize - page size.
    * @param {String} pageNo - page number.
    * @returns {json} Response consists of list of question's
    */
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


    /**
    * To details draft questions
    * @method
    * @name  details
    * @param {String} questionId- draftCriteriaId of the question.
    * @param {String} userId - keyclock user id.
    * @returns {json} Response consists of question details
    */
   static details(questionId, userId) {
    return new Promise(async (resolve, reject) => {
      try {

        let draftQuestionDocument = await database.models.draftQuestions.findOne({
          _id: questionId,
          userId: userId
        }).lean()
      
        if (!draftQuestionDocument) {
          throw new Error(CONSTANTS.apiResponses.DRAFT_QUESTION_NOT_FOUND);
        }
      
        return resolve({
          message: CONSTANTS.apiResponses.DRAFT_QUESTION_DETAILS_FETCHED,
          result: draftQuestionDocument
        })

      } catch (error) {
        reject(error)
      }
    })
  }

  

}