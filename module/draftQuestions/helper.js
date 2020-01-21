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

  static draftQuestionDocument(findQuery = "all", projection = "all") {
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
            let draftQuestionDocuments = await database.models.draftQuestions.find(
                filteredData,
                projectedData
            ).lean();

            return resolve(draftQuestionDocuments);
        } catch (error) {
            reject(error);
        }
    })
  }

   /**
    * Validate draft question.
    * @method
    * @name validate
    * @param {Object} filteredData  
    * @param {String} filteredData.userId - logged in user id.
    * @param {String} filteredData.status - status of draft question.
    * @param {String} filteredData._id - draft question id.
    * @returns {Object} draft question validation status.
    */

  static validate(filteredData) {
    return new Promise(async (resolve, reject) => {
        try {

            let draftQuestionDocuments = 
            await this.draftQuestionDocument(
              filteredData,
              {
                _id : 1,
                externalId : 1,
                responseType : 1,
                question : 1,
                instanceQuestions : 1,
                children : 1,
                visibleIf : 1,
                instanceIdentifier : 1
            });

            let validateQuestion = 
            await _validateQuestions(draftQuestionDocuments[0]);
            
            if( !validateQuestion.length > 0) {
              validateQuestion = true;
            }

            return resolve(validateQuestion);

        } catch (error) {
            return reject(error);
        }
    })
  }

}

/**
    * Default questions response type.
    * @method
    * @name _defaultResponseType
    * @returns {Array} Array of questions response type.
*/

function _defaultResponseType() {
  return [
    "radio",
    "text",
    "slider",
    "matrix",
    "multiselect",
    "number",
    "date",
  ]
}

/**
    * Validate questions error messages.
    * @method
    * @name _validateQuestions
    * @param {Object} questionsDocument -question data
    * @returns {Array} Array of questions error messages.
*/

function _validateQuestions(questionsDocument) {
  return new Promise(async (resolve, reject) => {
    try {

      let validationErrorData = [];

      // if question with given id is not found
      if( !questionsDocument ) {
        validationErrorData.push({
          message : messageConstants.apiResponses.DRAFT_QUESTION_NOT_FOUND
        })
      } else {

        // if question responseType is not of type: "radio","text","slider",
        // "matrix","multiselect","number","date"

        if( questionsDocument.responseType && 
          !_defaultResponseType().includes(questionsDocument.responseType)
        ) {
          validationErrorData.push({
            message : 
            messageConstants.apiResponses.DRAFT_QUESTION_RESPONSE_TYPE+".It should be:"
            +_defaultResponseType().toString()

          })
        }
  
        // if question name is not provided. 
        if( !(questionsDocument.question.length > 0) ) {
          validationErrorData.push({
            message : messageConstants.apiResponses.DRAFT_QUESTION_NAME
          });
        }
  
        if( questionsDocument.responseType === messageConstants.apiResponses.MATRIX_RESPONSE_TYPE ) {
  
          // if question responseType is matrix but instance questions does not exists.

          if(!questionsDocument.instanceQuestions.length > 0) {

            validationErrorData.push({
              message : 
              messageConstants.apiResponses.DRAFT_QUESTION_MATRIX_RESPONSE
            });
          }
  
          // if question responseType is matrix but instance identifier does not exists.
          if( questionsDocument.instanceIdentifier && 
            questionsDocument.instanceIdentifier === ""
          ) {
            validationErrorData.push({
              message : 
              messageConstants.apiResponses.MATRIX_QUESTION_INSTANCE_IDENTIFIER
            });
          }
        }
  
        // if given question is parent question and visibleIf is not empty. 

        if( questionsDocument.children && 
          questionsDocument.children.length > 0 && 
          questionsDocument.visibleIf !== ""
        ) {
          validationErrorData.push({
            message : 
            messageConstants.apiResponses.DRAFT_QUESTION_PARENT_CHECK
          });
        }

        
        let draftQuestions = 
        await database.models.draftQuestions.find({
            externalId : questionsDocument.externalId
        },{
            _id : 1
        });

        // if duplicate draft questions (based on external id) exists. 

        if( draftQuestions.length > 1 ) {
          validationErrorData.push({
            message : 
            messageConstants.apiResponses.UNIQUE_DRAFT_QUESTION
          });
        }
      }

      return resolve(validationErrorData);

    } catch(error) {
      return reject(error);
    }
  })
}